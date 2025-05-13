import { UsersController } from './controllers/users.controller';
import { UsersRepository } from './domain/users.abstract.repository';
import { UsersRepositoryImplementation } from './repository/user.repository';
import { DataSource } from 'typeorm';
import { UsersService } from './services/users.service';
import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TransactionsService } from '../transactions/services/transactions.service';
import { TransactionModule } from '../transactions/transactions.module';

@Module({
    imports: [forwardRef(() => AuthModule), TransactionModule],
    exports: [UsersService, UsersRepository],
    controllers: [UsersController],
    providers: [
        {
            provide: UsersRepository,
            inject: [DataSource],
            useFactory: (dataSource: DataSource) =>
                new UsersRepositoryImplementation(dataSource),
        },
        {
            provide: UsersService,
            inject: [UsersRepository, TransactionsService],
            useFactory: (
                usersRepository: UsersRepository,
                transactionsService: TransactionsService,
            ) => new UsersService(usersRepository, transactionsService),
        },
    ],
})
export class UserModule {}
