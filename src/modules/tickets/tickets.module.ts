import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { TicketsController } from './controllers/tickets.controller';
import { TicketsRepository } from './domain/tickets.abstract.repository';
import { DataSource } from 'typeorm';
import { TicketsRepositoryImplementation } from './repository/tickets.repository';
import { TicketsService } from './services/tickets.service';
import { UsersRepository } from '../users/domain/users.abstract.repository';
import { UserModule } from '../users/users.module';
import { TransactionsService } from '../transactions/services/transactions.service';
import { TransactionModule } from '../transactions/transactions.module';
import { SessionsService } from '../sessions/services/sessions.service';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
    imports: [AuthModule, UserModule, TransactionModule, SessionsModule],
    exports: [TicketsService, TicketsRepository],
    controllers: [TicketsController],
    providers: [
        {
            provide: TicketsRepository,
            inject: [DataSource],
            useFactory: (dataSource: DataSource) =>
                new TicketsRepositoryImplementation(dataSource),
        },
        {
            provide: TicketsService,
            inject: [
                TicketsRepository,
                UsersRepository,
                TransactionsService,
                SessionsService,
            ],
            useFactory: (
                ticketsRepository: TicketsRepository,
                usersRepository: UsersRepository,
                transactionService: TransactionsService,
                sessionsService: SessionsService,
            ) =>
                new TicketsService(
                    ticketsRepository,
                    usersRepository,
                    transactionService,
                    sessionsService,
                ),
        },
    ],
})
export class TicketsModule {}
