import { Room, CreateRoom } from '../domain/room.model';
import { RoomEntity } from '../../../core/entities/room.entity';
import {
    CreateRoomDto,
    RoomDto,
    UpdateRoomDto,
} from '../controllers/dto/rooms.dto';

export class RoomAdapter {
    static domainToDto(room: Room): RoomDto {
        return {
            id: room.id,
            name: room.name,
            description: room.description,
            capacity: room.capacity,
            type: room.type,
            handicap_friendly: room.handicap_friendly,
            maintenance: room.maintenance,

            images:
                room.images?.map((image) => ({
                    id: image.id,
                    url: image.url,
                })) || [],
        };
    }

    static dtoToDomain(roomDto: RoomDto): Room {
        return {
            id: roomDto.id,
            name: roomDto.name,
            description: roomDto.description,
            capacity: roomDto.capacity,
            type: roomDto.type,
            handicap_friendly: roomDto.handicap_friendly,
            maintenance: roomDto.maintenance,
        };
    }

    static entityToDomain(entity: RoomEntity): Room {
        const room: Room = {
            id: entity.id,
            name: entity.name,
            description: entity.description,
            capacity: entity.capacity,
            type: entity.type,
            handicap_friendly: entity.handicap_friendly,
            maintenance: entity.maintenance,
            images:
                entity.images?.map((image) => ({
                    id: image.id,
                    url: image.filename,
                    roomId: entity.id,
                    createdAt: image.createdAt,
                    updatedAt: image.updatedAt,
                })) || [],
        };

        return room;
    }

    static createDomainToEntity(room: CreateRoom): RoomEntity {
        const entity = new RoomEntity();
        entity.name = room.name;
        entity.description = room.description;
        entity.capacity = room.capacity;
        entity.type = room.type;
        entity.handicap_friendly = room.handicap_friendly;
        entity.maintenance = room.maintenance;
        return entity;
    }

    static createDtoToDomain(dto: CreateRoomDto): CreateRoom {
        return {
            name: dto.name,
            description: dto.description,
            capacity: dto.capacity,
            type: dto.type,
            handicap_friendly: dto.handicap_friendly,
            maintenance: dto.maintenance,
        };
    }

    static patchDtoToDomain(room: Room, dto: UpdateRoomDto): Room {
        return {
            ...room,
            name: dto.name ?? room.name,
            description: dto.description ?? room.description,
            capacity: dto.capacity ?? room.capacity,
            type: dto.type ?? room.type,
            handicap_friendly:
                dto.handicap_friendly !== undefined
                    ? dto.handicap_friendly
                    : room.handicap_friendly,
            maintenance:
                dto.maintenance !== undefined
                    ? dto.maintenance
                    : room.maintenance,
        };
    }
}
