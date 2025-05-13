import { Injectable } from '@nestjs/common';
import { AuthRepository as AuthRepository } from '../domain/auth.abstract.repository';
import { AuthAdapter } from '../adapters/auth.adapter';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LogInSignInDtoOutput } from '../controllers/dto/auth.dto';
import { CineError } from 'src/utils/CineError';
import { UserRoleEnum } from 'src/modules/users/domain/user-role.enum';
import { User } from 'src/modules/users/domain/user.model';
import { isNotNull, isNull } from 'src/utils/tools';
import { RefreshToken } from '../domain/refresh-token.model';
import { UsersRepository } from 'src/modules/users/domain/users.abstract.repository';
import { UserDecoded } from '../../../core/interfaces/jwt.interface';

@Injectable()
export class AuthService {
    constructor(
        private readonly authRepository: AuthRepository,
        private readonly jwtService: JwtService,
        private readonly userRepository: UsersRepository,
    ) {}

    async signIn(
        email: string,
        password: string,
    ): Promise<LogInSignInDtoOutput> {
        const isUserExist = await this.userRepository.findByEmail(email);
        if (isNotNull(isUserExist)) {
            throw new CineError(
                'account-already-exist',
                'Account already exist',
                400,
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const access_token = this.jwtService.sign(
            { email: email, role: UserRoleEnum.CLIENT },
            {
                expiresIn: '5m',
            },
        );

        const refreshToken = this.jwtService.sign(
            { email: email, role: UserRoleEnum.CLIENT },
            {
                expiresIn: '15d',
            },
        );

        const userInsert: User = {
            id: 0,
            email: email,
            password: hashedPassword,
            role: UserRoleEnum.CLIENT,
            money: 0,
        };

        const insertedUser = await this.authRepository.signIn(userInsert);

        const tokenInsert: RefreshToken = {
            token: refreshToken,
            userId: insertedUser.id,
        };

        await this.authRepository.saveToken(tokenInsert);

        return AuthAdapter.SignToDtoOutput(access_token, refreshToken);
    }

    async logIn(
        email: string,
        password: string,
    ): Promise<LogInSignInDtoOutput> {
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new CineError(
                'NotFoundAccountError',
                'Email ou mot de passe incorrect',
                400,
            );
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (isNull(isPasswordMatch)) {
            throw new CineError(
                'NotFoundAccountError',
                'Email ou mot de passe incorrect',
                400,
            );
        }

        const access_token = this.jwtService.sign(
            { email: email, role: user.role },
            {
                expiresIn: '5m',
            },
        );

        const refresh_token = this.jwtService.sign(
            { email: email, role: user.role },
            {
                expiresIn: '15d',
            },
        );

        const token: RefreshToken = {
            token: refresh_token,
            userId: user.id,
        };

        await this.authRepository.saveToken(token);

        return AuthAdapter.SignToDtoOutput(access_token, refresh_token);
    }

    async refresh(refresh_token: string): Promise<LogInSignInDtoOutput> {
        const decoded = this.jwtService.decode<UserDecoded>(refresh_token);
        if (!decoded || !decoded.email) {
            throw new CineError(
                'invalid-token',
                'Token could not be decoded',
                401,
            );
        }

        const user = await this.userRepository.findByEmail(decoded.email);
        if (isNull(user)) {
            throw new CineError('wrong-jwt', 'Refresh token expiré', 401);
        }

        const tokens: RefreshToken[] = await this.authRepository.getTokensById(
            user.id,
        );
        if (!tokens.some((token) => token.token === refresh_token)) {
            throw new CineError('wrong-jwt', 'Refresh token expiré', 401);
        }

        const access_token = this.jwtService.sign(
            { email: decoded.email, role: user.role },
            {
                expiresIn: '5m',
            },
        );

        const new_refresh_token = this.jwtService.sign(
            { email: decoded.email, role: user.role },
            {
                expiresIn: '15d',
            },
        );

        const token: RefreshToken = {
            token: new_refresh_token,
            userId: user.id,
        };

        await this.authRepository.saveToken(token);

        return AuthAdapter.SignToDtoOutput(access_token, new_refresh_token);
    }

    async logout(refresh_token: string): Promise<void> {
        await this.authRepository.deleteToken(refresh_token);
    }
}
