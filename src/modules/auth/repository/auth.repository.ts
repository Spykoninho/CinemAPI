import { DataSource } from 'typeorm';
import { AuthRepository as AuthRepository } from '../domain/auth.abstract.repository';
import { UserEntity } from 'src/core/entities/user.entity';
import { User } from 'src/modules/users/domain/user.model';
import { RefreshToken } from '../domain/refresh-token.model';
import { RefreshTokenEntity } from 'src/core/entities/refresh-token.entity';
import { CineError } from 'src/utils/CineError';

export class AuthRepositoryImplementation implements AuthRepository {
    constructor(private readonly dataSource: DataSource) {}

    getTokensById(userId: number): Promise<RefreshTokenEntity[] | []> {
        const tokens = this.dataSource
            .getRepository(RefreshTokenEntity)
            .createQueryBuilder('refresh_tokens')
            .where('refresh_tokens.userId = :userId', { userId: userId })
            .andWhere('refresh_tokens.expirationDate > NOW()')
            .getMany();
        return tokens;
    }

    async signIn(user: User): Promise<UserEntity> {
        const insertedUser = this.dataSource.getRepository(UserEntity).create({
            email: user.email,
            password: user.password,
            role: user.role,
            money: user.money,
        });
        return await this.dataSource
            .getRepository(UserEntity)
            .save(insertedUser);
    }

    async deleteToken(token: string): Promise<void> {
        const result = await this.dataSource
            .getRepository(RefreshTokenEntity)
            .delete({
                token: token,
            });
        if (result.affected === 0) {
            throw new CineError(
                'delete-token-error',
                'Token already deleted',
                404,
            );
        }
    }

    async saveToken(token: RefreshToken): Promise<RefreshTokenEntity> {
        const insertedToken = this.dataSource
            .getRepository(RefreshTokenEntity)
            .create({
                token: token.token,
                userId: token.userId,
                expirationDate: new Date(new Date().getTime() + 15 * 60 * 1000),
            });
        return await this.dataSource
            .getRepository(RefreshTokenEntity)
            .save(insertedToken);
    }

    async updateTokens(
        old_token: number,
        refresh_token: string,
    ): Promise<void> {
        await this.dataSource
            .getRepository(RefreshTokenEntity)
            .update(old_token, {
                token: refresh_token,
            });
    }
}
