import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TransactionType } from '../../modules/transactions/domain/transaction-type.enum';

@Entity({ name: 'transactions' })
export class TransactionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    amount: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    transactionDate: Date;

    @Column()
    transactionType: TransactionType;
}
