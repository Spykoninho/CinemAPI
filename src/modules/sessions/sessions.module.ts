import { forwardRef, Module } from '@nestjs/common';
import { SessionsController } from './controllers/sessions.controller';
import { SessionsService } from './services/sessions.service';
import { DataSource } from 'typeorm';
import { SessionsRepository } from './domain/sessions.repository';
import { SessionsRepositoryImplementation } from './repository/sessions-repository.implementation';
import { AuthModule } from '../auth/auth.module';
import { MoviesRepository } from '../movies/domain/movies.repository';
import { RoomsRepository } from '../rooms/domain/rooms.repository';
import { MoviesModule } from '../movies/movies.module';
import { RoomsModule } from '../rooms/rooms.module';
import { UserModule } from '../users/users.module';
import { UsersRepository } from '../users/domain/users.abstract.repository';
import { TicketsRepository } from '../tickets/domain/tickets.abstract.repository';
import { TicketsModule } from '../tickets/tickets.module';

@Module({
    imports: [
        AuthModule,
        MoviesModule,
        RoomsModule,
        UserModule,
        forwardRef(() => TicketsModule),
    ],
    controllers: [SessionsController],
    exports: [SessionsService, SessionsRepository],
    providers: [
        {
            provide: SessionsRepository,
            inject: [DataSource],
            useFactory: (dataSource: DataSource) =>
                new SessionsRepositoryImplementation(dataSource),
        },
        {
            provide: SessionsService,
            inject: [
                SessionsRepository,
                MoviesRepository,
                RoomsRepository,
                UsersRepository,
                TicketsRepository,
            ],
            useFactory: (
                sessionsRepository: SessionsRepository,
                moviesRepository: MoviesRepository,
                roomsRepository: RoomsRepository,
                usersRepository: UsersRepository,
                ticketsRepository: TicketsRepository,
            ) =>
                new SessionsService(
                    sessionsRepository,
                    moviesRepository,
                    roomsRepository,
                    usersRepository,
                    ticketsRepository,
                ),
        },
    ],
})
export class SessionsModule {}
