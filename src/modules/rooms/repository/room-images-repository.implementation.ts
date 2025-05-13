import { DataSource } from 'typeorm';
import { RoomImagesRepository } from '../domain/room-images.repository';
import { RoomImage, CreateRoomImage } from '../domain/room-image.model';
import { RoomImageEntity } from '../../../core/entities/room-image.entity';
import { RoomImageAdapter } from '../adapters/room-images.adapter';
import { CineError } from '../../../utils/CineError';
import { isNull } from '../../../utils/tools';
import { RoomEntity } from '../../../core/entities/room.entity';

export class RoomImagesRepositoryImplementation
    implements RoomImagesRepository
{
    constructor(private readonly dataSource: DataSource) {}

    async getRoomImages(roomId: number): Promise<RoomImage[]> {
        const room = await this.dataSource
            .getRepository(RoomEntity)
            .findOne({
                where: { id: roomId },
            });

        if (isNull(room)) {
            throw new CineError('room_not_found', 'Room not found', 404, {
                roomId,
            });
        }

        const images = await this.dataSource
            .getRepository(RoomImageEntity)
            .find({
                where: { room: { id: roomId } },
                relations: ['room'],
            });

        return images.map(RoomImageAdapter.entityToDomain);
    }

    async createRoomImage(image: CreateRoomImage): Promise<RoomImage> {
        const room = await this.dataSource
            .getRepository(RoomEntity)
            .findOne({
                where: { id: image.roomId },
            });

        if (isNull(room)) {
            throw new CineError('room_not_found', 'Room not found', 404, {
                roomId: image.roomId,
            });
        }

        const entity = RoomImageAdapter.createDomainToEntity(image);
        const saved = await this.dataSource
            .getRepository(RoomImageEntity)
            .save(entity);

        return RoomImageAdapter.entityToDomain(saved);
    }

    async deleteRoomImage(id: number): Promise<void> {
        const image = await this.dataSource
            .getRepository(RoomImageEntity)
            .findOne({
                where: { id },
                relations: ['room'],
            });

        if (isNull(image)) {
            throw new CineError(
                'image_not_found',
                'Room image not found',
                404,
                {
                    imageId: id,
                },
            );
        }

        const result = await this.dataSource
            .getRepository(RoomImageEntity)
            .delete(id);

        if (result.affected === 0) {
            throw new CineError(
                'image_not_found',
                'Room image not found',
                404,
                {
                    imageId: id,
                },
            );
        }
    }

    async getRoomImageById(id: number): Promise<RoomImage> {
        const image = await this.dataSource
            .getRepository(RoomImageEntity)
            .findOne({
                where: { id },
                relations: ['room'],
            });

        if (isNull(image)) {
            throw new CineError(
                'image_not_found',
                'Room image not found',
                404,
                {
                    imageId: id,
                },
            );
        }

        return RoomImageAdapter.entityToDomain(image);
    }
}
