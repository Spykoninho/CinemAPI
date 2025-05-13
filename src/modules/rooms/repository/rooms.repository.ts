import { DataSource } from 'typeorm';
import { isNull } from '../../../utils/tools';
import { CineError } from '../../../utils/CineError';
import { CreateRoom, Room } from '../domain/room.model';
import { RoomEntity } from 'src/core/entities/room.entity';
import { RoomsRepository } from '../domain/rooms.repository';
import { RoomAdapter } from '../adapters/rooms.adapter';
import { GetRoomsQueryDto } from '../controllers/dto/rooms.dto';
import { RoomImageEntity } from 'src/core/entities/room-image.entity';

export class RoomsRepositoryImplementation implements RoomsRepository {
    constructor(private readonly dataSource: DataSource) {}

    async getRoomById(id: number): Promise<Room> {
        const room = await this.dataSource
            .getRepository(RoomEntity)

            .findOne({
                where: { id },
                relations: ['images'],
            });

        if (isNull(room)) {
            throw new CineError('room_not_found', 'Room not found', 404, {
                roomId: id,
            });
        }

        return RoomAdapter.entityToDomain(room);
    }

    async createRoom(room: CreateRoom): Promise<Room> {
        const roomEntity = RoomAdapter.createDomainToEntity(room);
        await this.dataSource.getRepository(RoomEntity).save(roomEntity);
        return RoomAdapter.entityToDomain(roomEntity);
    }

    async deleteRoom(id: number): Promise<Room> {
        const room = await this.dataSource
            .getRepository(RoomEntity)
            .findOne({ 
                where: { id },
                relations: ['images']
            });

        if (isNull(room)) {
            throw new CineError('room_not_found', 'Room not found', 404, {
                roomId: id,
            });
        }

        // Supprimer d'abord toutes les images de la salle
        if (room.images && room.images.length > 0) {
            await this.dataSource
                .getRepository(RoomImageEntity)
                .delete({ room: { id } });
        }

        // Ensuite supprimer la salle
        await this.dataSource.getRepository(RoomEntity).delete(id);

        return RoomAdapter.entityToDomain(room);
    }

    async updateRoom(room: Room): Promise<Room> {
        const repo = this.dataSource.getRepository(RoomEntity);

        const existing = await repo.findOne({ where: { id: room.id } });

        if (isNull(existing)) {
            throw new CineError('room_not_found', 'Room not found', 404, {
                roomId: room.id,
            });
        }
        existing.name = room.name;
        existing.description = room.description;
        existing.capacity = room.capacity;
        existing.type = room.type;
        existing.handicap_friendly = room.handicap_friendly;
        existing.maintenance = room.maintenance;
        existing.updatedAt = new Date();
        const saved = await repo.save(existing);
        return RoomAdapter.entityToDomain(saved);
    }

    async getAllRooms(
        filters?: GetRoomsQueryDto,
        page: number = 1,
        limit: number = 10,
    ): Promise<{ items: Room[]; total: number }> {
        const queryBuilder = this.dataSource
            .getRepository(RoomEntity)
            .createQueryBuilder('room')
            .leftJoinAndSelect('room.images', 'images');

        if (filters?.minCapacity) {
            queryBuilder.andWhere('room.capacity >= :capacity', {
                capacity: filters.minCapacity,
            });
        }

        if (filters?.type) {
            queryBuilder.andWhere('room.type = :type', { type: filters.type });
        }

        if (filters?.maintenance !== undefined) {
            queryBuilder.andWhere('room.maintenance = :maintenance', {
                maintenance: filters.maintenance,
            });
        }

        const [items, total] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return {
            items: items.map(RoomAdapter.entityToDomain),
            total,
        };
    }
}
