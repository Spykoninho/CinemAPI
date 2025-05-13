import { Transaction } from '../domain/transactions.model';
import { ResponseTransactionDto } from '../controllers/dto/transactions.dto';
import { TransactionsEntity } from '../../../core/entities/transactions.entity';

export class TransactionsAdapter {
    static entityToDomain(transactionsEntity: TransactionsEntity): Transaction {
        return {
            id: transactionsEntity.id,
            userId: transactionsEntity.userId,
            transactionType: transactionsEntity.transactionType,
            amount: transactionsEntity.amount,
            transactionDate: transactionsEntity.transactionDate,
        };
    }

    static domainToEntity(transaction: Transaction): TransactionsEntity {
        const transactionsEntity = new TransactionsEntity();
        transactionsEntity.id = transaction.id;
        transactionsEntity.userId = transaction.userId;
        transactionsEntity.transactionType = transaction.transactionType;
        transactionsEntity.amount = transaction.amount;
        transactionsEntity.transactionDate = transaction.transactionDate;

        return transactionsEntity;
    }

    static domainToResponseTransaction(
        transaction: Transaction,
    ): ResponseTransactionDto {
        return {
            id: transaction.id,
            userId: transaction.userId,
            transactionType: transaction.transactionType,
            amount: transaction.amount,
            transactionDate: transaction.transactionDate,
        };
    }
    static listDomainToResponseTransaction(
        transactions: Transaction[],
    ): ResponseTransactionDto[] {
        return transactions.map((transaction) => ({
            id: transaction.id,
            userId: transaction.userId,
            transactionType: transaction.transactionType,
            amount: transaction.amount,
            transactionDate: transaction.transactionDate,
        }));
    }

    static entityToResponseTransaction(
        transactionsEntity: TransactionsEntity,
    ): ResponseTransactionDto {
        return {
            id: transactionsEntity.id,
            userId: transactionsEntity.userId,
            transactionType: transactionsEntity.transactionType,
            amount: transactionsEntity.amount,
            transactionDate: transactionsEntity.transactionDate,
        };
    }
}
