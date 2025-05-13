import { Module } from '@nestjs/common';
import { RoomService } from './services/room.service';
import { RoomsRepository } from './domain/rooms.repository';
import { DataSource } from 'typeorm';
import { RoomsRepositoryImplementation } from './repository/rooms.repository';
import { RoomController } from './controllers/rooms.controller';
import { RoomImagesRepository } from './domain/room-images.repository';
import { RoomImagesRepositoryImplementation } from './repository/room-images-repository.implementation';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../users/users.module';
import { MinioService } from '../../core/services/minio.service';
import { MinioModule } from 'nestjs-minio-client';

@Module({
    imports: [
        AuthModule,
        UserModule,
        MinioModule.register({
            endPoint: process.env.MINIO_ENDPOINT || 'localhost',
            port: parseInt(process.env.MINIO_PORT || '9000', 10),
            useSSL: process.env.MINIO_USE_SSL === 'true',
            accessKey: process.env.MINIO_ACCESS_KEY || 'user',
            secretKey: process.env.MINIO_SECRET_KEY || 'password',
            region: process.env.MINIO_REGION || 'us-east-1',
        }),
    ],
    controllers: [RoomController],
    providers: [
        {
            provide: RoomsRepository,
            inject: [DataSource],
            useFactory: (dataSource: DataSource) =>
                new RoomsRepositoryImplementation(dataSource),
        },
        {
            provide: RoomImagesRepository,
            inject: [DataSource],
            useFactory: (dataSource: DataSource) =>
                new RoomImagesRepositoryImplementation(dataSource),
        },
        MinioService,
        {
            provide: RoomService,
            inject: [RoomsRepository, RoomImagesRepository, MinioService],
            useFactory: (
                roomsRepository: RoomsRepository,
                roomImagesRepository: RoomImagesRepository,
                minioService: MinioService,
            ) =>
                new RoomService(
                    roomsRepository,
                    roomImagesRepository,
                    minioService,
                ),
        },
    ],
    exports: [RoomsRepository],
})
export class RoomsModule {}
