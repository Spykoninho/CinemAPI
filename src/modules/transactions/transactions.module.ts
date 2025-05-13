import { TransactionsController } from './controllers/transactions.controller';
import { TransactionRepository } from './domain/transactions.abstract.repository';
import { TransactionRepositoryImplementation } from './repository/transactions.repository';
import { DataSource } from 'typeorm';
import { TransactionsService } from './services/transactions.service';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';
import { UsersRepository } from '../users/domain/users.abstract.repository';

@Module({
    imports: [forwardRef(() => AuthModule), forwardRef(() => UserModule)],
    exports: [TransactionsService, TransactionRepository],
    controllers: [TransactionsController],
    providers: [
        {
            provide: TransactionRepository,
            inject: [DataSource],
            useFactory: (dataSource: DataSource) =>
                new TransactionRepositoryImplementation(dataSource),
        },
        {
            provide: TransactionsService,
            inject: [TransactionRepository, UsersRepository],
            useFactory: (
                transactionRepository: TransactionRepository,
                userRepository: UsersRepository,
            ) => new TransactionsService(transactionRepository, userRepository),
        },
    ],
})
export class TransactionModule {}
