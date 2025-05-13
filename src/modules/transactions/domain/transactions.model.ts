import { TransactionType } from './transaction-type.enum';

export interface Transaction {
    id: number;
    userId: number;
    amount: number;
    transactionDate: Date;
    transactionType: TransactionType;
}
