import { User } from 'src/modules/users/domain/user.model';
import { RefreshToken } from './refresh-token.model';
import { RefreshTokenEntity } from 'src/core/entities/refresh-token.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class AuthRepository {
    abstract signIn(user: User): Promise<User>;

    abstract saveToken(token: RefreshToken): Promise<RefreshTokenEntity>;

    abstract getTokensById(userId: number): Promise<RefreshTokenEntity[] | []>;

    abstract deleteToken(token: string): Promise<void>;
}
