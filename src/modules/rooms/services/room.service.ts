import { Injectable } from '@nestjs/common';
import { RoomsRepository } from '../domain/rooms.repository';

import { RoomAdapter } from '../adapters/rooms.adapter';
import {
    UpdateRoomDto,
    RoomDto,
    CreateRoomImageDto,
} from '../controllers/dto/rooms.dto';
import { CreateRoom, Room } from '../domain/room.model';
import { GetRoomsQueryDto } from '../controllers/dto/rooms.dto';
import { RoomImagesRepository } from '../domain/room-images.repository';
import { MinioService } from '../../../core/services/minio.service';
import { Paginated } from '../../../core/pagination/pagination';

@Injectable()
export class RoomService {
    constructor(
        private readonly roomsRepository: RoomsRepository,
        private readonly roomImagesRepository: RoomImagesRepository,
        private readonly minioService: MinioService,
    ) {}

    async getRoomById(id: number) {
        return this.roomsRepository.getRoomById(id);
    }

    async createRoom(room: CreateRoom): Promise<Room> {
        return this.roomsRepository.createRoom(room);
    }

    async deleteRoom(id: number) {
        return this.roomsRepository.deleteRoom(id);
    }

    async updateRoom(id: number, dto: UpdateRoomDto): Promise<Room> {
        const existingRoom = await this.roomsRepository.getRoomById(id);
        const updatedRoom = RoomAdapter.patchDtoToDomain(existingRoom, dto);
        return this.roomsRepository.updateRoom(updatedRoom);
    }

    async getAllRooms(
        filters?: GetRoomsQueryDto,
        page: number = 1,
        limit: number = 10,
    ): Promise<Paginated<RoomDto>> {
        const { items, total } = await this.roomsRepository.getAllRooms(
            filters,
            page,
            limit
        );
        
        return new Paginated(
            items.map(RoomAdapter.domainToDto),
            { page, limit },
            total
        );
    }

    async uploadRoomImage(roomId: number, file: Express.Multer.File) {
        const [url, filename] = await this.minioService.uploadFile(
            file,
            roomId,
        );
        const room = await this.roomImagesRepository.createRoomImage({
            filename,
            roomId,
        });
        return [url, room.id];
    }

    async deleteRoomImage(id: number) {
        const image = await this.roomImagesRepository.getRoomImageById(id);
        await this.minioService.deleteFile(image.filename);
        await this.roomImagesRepository.deleteRoomImage(id);
    }

    async getRoomImages(roomId: number): Promise<CreateRoomImageDto[]> {
        const images = await this.roomImagesRepository.getRoomImages(roomId);
        const urls = await Promise.all(
            images.map(async (image) => {
                const url = await this.minioService.getPublicUrlByFilename(
                    image.filename,
                );
                return {
                    id: image.id,
                    url,
                    roomId: image.roomId,
                };
            }),
        );
        return urls;
    }
}
