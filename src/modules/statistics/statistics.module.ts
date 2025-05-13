import { Module } from '@nestjs/common';
import { StatisticsController } from './controllers/statistics.controller';
import { StatisticsService } from './services/statistics.service';
import { StatisticsRepository } from './domain/statistics.repository';
import { StatisticsRepositoryImplementation } from './repository/statistics.repository.implementation';
import { SessionsModule } from '../sessions/sessions.module';
import { TicketsModule } from '../tickets/tickets.module';
import { RoomsModule } from '../rooms/rooms.module';
import { MoviesModule } from '../movies/movies.module';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';

@Module({
    imports: [
        SessionsModule,
        TicketsModule,
        RoomsModule,
        MoviesModule,
        AuthModule,
        UserModule,
    ],
    controllers: [StatisticsController],
    providers: [
        StatisticsService,
        {
            provide: StatisticsRepository,
            useClass: StatisticsRepositoryImplementation,
        },
    ],
    exports: [StatisticsService],
})
export class StatisticsModule {}
