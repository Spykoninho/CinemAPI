import { DataSource } from 'typeorm';
import { TransactionRepository } from '../domain/transactions.abstract.repository';
import { Transaction } from '../domain/transactions.model';
import { TransactionsEntity } from '../../../core/entities/transactions.entity';

export class TransactionRepositoryImplementation
    implements TransactionRepository
{
    constructor(private readonly dataSource: DataSource) {}

    async saveTransaction(transaction: Transaction): Promise<Transaction> {
        return this.dataSource
            .getRepository(TransactionsEntity)
            .save(transaction);
    }

    async getTransactionsByUserId(
        userId: number,
        offset: number,
        limit: number,
    ): Promise<[Transaction[], number]> {
        const [transactions, count] = await this.dataSource
            .getRepository(TransactionsEntity)
            .findAndCount({
                where: {
                    userId: userId,
                },
                skip: offset,
                take: limit,
            });
        return [transactions, count];
    }
}
