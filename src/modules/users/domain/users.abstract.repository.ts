import { UserEntity } from 'src/core/entities/user.entity';

export abstract class UsersRepository {
    abstract getUsers(
        limit: number,
        offset: number,
    ): Promise<[UserEntity[], number] | [[], number]>;

    abstract findByEmail(email: string): Promise<UserEntity | null>;

    abstract updateMoney(userId: number, money: number): Promise<void>;
}
