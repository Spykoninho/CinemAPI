import { Module } from '@nestjs/common';
import { MoviesController } from './controllers/movies.controller';
import { MoviesService } from './services/movies.service';
import { DataSource } from 'typeorm';
import { MoviesRepository } from './domain/movies.repository';
import { MoviesRepositoryImplementation } from './repository/movies-repository.implementation';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';

@Module({
    imports: [AuthModule, UserModule],
    controllers: [MoviesController],
    providers: [
        {
            provide: MoviesRepository,
            inject: [DataSource],
            useFactory: (dataSource: DataSource) =>
                new MoviesRepositoryImplementation(dataSource),
        },
        {
            provide: MoviesService,
            inject: [MoviesRepository],
            useFactory: (moviesRepository: MoviesRepository) =>
                new MoviesService(moviesRepository),
        },
    ],
    exports: [MoviesRepository],
})
export class MoviesModule {}
