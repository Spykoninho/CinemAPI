import { Injectable } from '@nestjs/common';
import { UsersRepository as UsersRepository } from '../domain/users.abstract.repository';
import { ResponseUserDto } from '../controllers/dto/user.dto';
import { UserAdapter } from '../adapters/user.adapter';
import { CineError } from '../../../utils/CineError';
import { TransactionsService } from '../../transactions/services/transactions.service';
import { TransactionType } from '../../transactions/domain/transaction-type.enum';

@Injectable()
export class UsersService {
    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly transactionsService: TransactionsService,
    ) {}

    async getUsers(
        page: number,
        limit: number,
    ): Promise<[ResponseUserDto[], number] | [[], number]> {
        const offset = page * limit - limit;
        const [users, count] = await this.usersRepository.getUsers(
            limit,
            offset,
        );
        if (users.length === 0) {
            return [[], 0];
        }
        const returnedUsers: ResponseUserDto[] = [];
        for (const user of users) {
            returnedUsers.push(UserAdapter.entityToResponseUser(user));
        }
        return [returnedUsers, count];
    }

    async getUserByEmail(email: string): Promise<ResponseUserDto> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new CineError('user-not-found', 'User not found', 404);
        }

        return UserAdapter.entityToResponseUser(user);
    }

    async depositMoney(email: string, money: number): Promise<ResponseUserDto> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new CineError('user-not-found', 'User not found', 404);
        }
        user.money += money;
        await this.usersRepository.updateMoney(user.id, user.money);

        await this.transactionsService.saveTransaction(
            money,
            user.id,
            TransactionType.DEPOSIT,
        );

        return UserAdapter.entityToResponseUser(user);
    }

    async withdrawMoney(
        email: string,
        money: number,
    ): Promise<ResponseUserDto> {
        const user = await this.usersRepository.findByEmail(email);
        if (!user) {
            throw new CineError('user-not-found', 'User not found', 404);
        }

        if (user.money < money) {
            throw new CineError('not-enough-money', 'Not enough money', 400);
        }

        user.money -= money;
        await this.usersRepository.updateMoney(user.id, user.money);

        await this.transactionsService.saveTransaction(
            money,
            user.id,
            TransactionType.WITHDRAW,
        );

        return UserAdapter.entityToResponseUser(user);
    }
}
