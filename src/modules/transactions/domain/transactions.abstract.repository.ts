import { Transaction } from './transactions.model';

export abstract class TransactionRepository {
    abstract saveTransaction(transaction: Transaction): Promise<Transaction>;

    abstract getTransactionsByUserId(
        userId: number,
        offset: number,
        limit: number,
    ): Promise<[Transaction[], number]>;
}
