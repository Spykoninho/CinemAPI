import { DataSource } from 'typeorm';
import { UsersRepository } from '../domain/users.abstract.repository';
import { UserEntity } from 'src/core/entities/user.entity';

export class UsersRepositoryImplementation implements UsersRepository {
    constructor(private readonly dataSource: DataSource) {}

    async getUsers(
        limit: number,
        offset: number,
    ): Promise<[UserEntity[], number] | [[], number]> {
        const query = this.dataSource
            .createQueryBuilder()
            .select('users')
            .skip(offset)
            .take(limit)
            .from(UserEntity, 'users');
        const [users, count] = await query.getManyAndCount();
        if (!users) {
            return [[], 0];
        }
        return [users, count];
    }

    async findByEmail(email: string): Promise<UserEntity | null> {
        return await this.dataSource.getRepository(UserEntity).findOne({
            where: {
                email: email,
            },
        });
    }

    async updateMoney(userId: number, money: number): Promise<void> {
        await this.dataSource
            .getRepository(UserEntity)
            .update({ id: userId }, { money: money });
    }
}
