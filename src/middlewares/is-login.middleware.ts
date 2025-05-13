import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRepository } from 'src/modules/auth/domain/auth.abstract.repository';
import { RefreshToken } from 'src/modules/auth/domain/refresh-token.model';
import { UsersRepository } from 'src/modules/users/domain/users.abstract.repository';
import { CineError } from 'src/utils/CineError';
import { isNull } from '../utils/tools';
import { RequestWithUser, UserDecoded } from '../core/interfaces/jwt.interface';

@Injectable()
export class IsLoginGuard implements CanActivate {
    constructor(
        private readonly jwtService: JwtService,
        private readonly authRepository: AuthRepository,
        private readonly usersRepository: UsersRepository,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<RequestWithUser>();

        if (
            !request.headers.authorization ||
            !request.headers.authorization.startsWith('Bearer ')
        ) {
            throw new UnauthorizedException('Veuillez vous connecter');
        }

        const token = request.headers.authorization.replace('Bearer ', '');

        let decodedToken: UserDecoded;
        try {
            decodedToken = this.jwtService.verify<UserDecoded>(token, {
                secret: process.env.JWT_SECRET,
            });
        } catch (error) {
            if (error instanceof UnauthorizedException) {
                throw new CineError('wrong-jwt', error.message, 401);
            }
            throw new CineError('invalid-token', 'Token is invalid', 401);
        }

        const user = await this.usersRepository.findByEmail(decodedToken.email);
        if (isNull(user)) {
            throw new CineError('invalid-token', 'Token is invalid', 401);
        }
        const refresh_tokens: RefreshToken[] =
            await this.authRepository.getTokensById(user.id);
        if (
            refresh_tokens.some(
                (refresh_token) => refresh_token.token === token,
            )
        ) {
            throw new CineError('invalid-token', 'Token is invalid', 401);
        }

        request.user = decodedToken; // a prendre ensuite dans req.user Request() req
        return true;
    }
}
