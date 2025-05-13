import * as dotenv from 'dotenv';

dotenv.config();
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './modules/movies/movies.module';
import { RoomsModule } from './modules/rooms/rooms.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/users/users.module';
import { TicketsModule } from './modules/tickets/tickets.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { MetricsModule } from './modules/metrics/metrics.module';
import { AppController } from './app.controller';
import { MetricsMiddleware } from './middlewares/metrics.middleware';

@Module({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT) || 55432,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            synchronize: process.env.DATABASE_SYNCHRONIZE === 'true' || true,
            entities: [__dirname + '/**/*.entity{.ts,.js}'],
            autoLoadEntities: true,
        }),
        MoviesModule,
        RoomsModule,
        TicketsModule,
        AuthModule,
        UserModule,
        SessionsModule,
        StatisticsModule,
        MetricsModule,
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(MetricsMiddleware).forRoutes('*');
    }
}
