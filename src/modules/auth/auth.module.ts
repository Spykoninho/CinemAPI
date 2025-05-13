import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthRepositoryImplementation } from './repository/auth.repository';
import { DataSource } from 'typeorm';
import { AuthService } from './services/auth.service';
import { AuthRepository } from './domain/auth.abstract.repository';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersRepository } from '../users/domain/users.abstract.repository';
import { UserModule } from '../users/users.module';
import * as process from 'node:process';

@Module({
    imports: [
        JwtModule.register({
            secret: process.env.JWT_SECRET,
        }),
        forwardRef(() => UserModule),
    ],
    exports: [AuthRepository, JwtModule],
    controllers: [AuthController],
    providers: [
        {
            provide: AuthRepository,
            inject: [DataSource],
            useFactory: (dataSource: DataSource) =>
                new AuthRepositoryImplementation(dataSource),
        },
        {
            provide: AuthService,
            inject: [AuthRepository, JwtService, UsersRepository],
            useFactory: (
                authRepository: AuthRepository,
                jwtService: JwtService,
                usersRepository: UsersRepository,
            ) => new AuthService(authRepository, jwtService, usersRepository),
        },
    ],
})
export class AuthModule {}
