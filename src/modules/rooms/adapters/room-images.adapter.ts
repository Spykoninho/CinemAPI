import { RoomImage, CreateRoomImage } from '../domain/room-image.model';
import { RoomImageEntity } from '../../../core/entities/room-image.entity';
import {
    RoomImageDto,
    CreateRoomImageDto,
} from '../controllers/dto/room-images.dto';

export class RoomImageAdapter {
    static domainToDto(image: RoomImage): RoomImageDto {
        return {
            id: image.id,
            url: image.filename,
            roomId: image.roomId,
            createdAt: image.createdAt,
            updatedAt: image.updatedAt,
        };
    }

    static entityToDomain(entity: RoomImageEntity): RoomImage {
        return {
            id: entity.id,
            filename: entity.filename,
            roomId: entity.room.id,
            createdAt: entity.createdAt,
            updatedAt: entity.updatedAt,
        };
    }

    static createDtoToDomain(dto: CreateRoomImageDto): CreateRoomImage {
        return {
            filename: dto.url,
            roomId: dto.roomId,
        };
    }

    static createDomainToEntity(image: CreateRoomImage): RoomImageEntity {
        const entity = new RoomImageEntity();
        entity.filename = image.filename;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        entity.room = { id: image.roomId } as any;
        return entity;
    }
}
