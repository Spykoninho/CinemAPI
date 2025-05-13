import { User } from 'src/modules/users/domain/user.model';

export abstract class AuthRepository {
    abstract signIn(user: User): Promise<User>;

    abstract findByEmail(email: string): Promise<User | null>;

    abstract updateTokens(
        id: number,
        access_token: string,
        refresh_token: string,
    ): Promise<void>;
}
