import { TransactionType } from '../../domain/transaction-type.enum';

export class ResponseTransactionDto {
    id: number;
    userId: number;
    amount: number;
    transactionDate: Date;
    transactionType: TransactionType;
}

export class TransactionRequestDto {
    email: string;
}
