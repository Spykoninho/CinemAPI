import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../domain/transactions.abstract.repository';
import { Transaction } from '../domain/transactions.model';
import { TransactionType } from '../domain/transaction-type.enum';
import { UsersRepository } from '../../users/domain/users.abstract.repository';
import { isNull } from '../../../utils/tools';
import { CineError } from '../../../utils/CineError';

@Injectable()
export class TransactionsService {
    constructor(
        private readonly transactionRepository: TransactionRepository,
        private readonly userRepository: UsersRepository,
    ) {}

    async saveTransaction(
        amount: number,
        userId: number,
        type: TransactionType,
    ): Promise<Transaction> {
        const transaction: Transaction = {
            id: 0,
            userId,
            amount,
            transactionDate: new Date(),
            transactionType: type,
        };

        return this.transactionRepository.saveTransaction(transaction);
    }

    async getTransactionsByEmail(
        email: string,
        page: number,
        limit: number,
    ): Promise<[Transaction[], number]> {
        const offset = page * limit - limit;
        const user = await this.userRepository.findByEmail(email);
        if (isNull(user)) {
            throw new CineError('user-not-found', 'User not found', 404);
        }
        const [transactions, count] =
            await this.transactionRepository.getTransactionsByUserId(
                user.id,
                offset,
                limit,
            );

        return [transactions, count];
    }
}
