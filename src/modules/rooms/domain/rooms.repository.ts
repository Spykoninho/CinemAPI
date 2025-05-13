import { CreateRoom, Room } from './room.model';
import { GetRoomsQueryDto } from '../controllers/dto/rooms.dto';

export abstract class RoomsRepository {
    abstract getRoomById(id: number): Promise<Room>;
    abstract createRoom(room: CreateRoom): Promise<Room>;
    abstract deleteRoom(id: number): Promise<Room>;
    abstract updateRoom(room: Room): Promise<Room>;
    abstract getAllRooms(
        filters?: GetRoomsQueryDto,
        page?: number,
        limit?: number,
    ): Promise<{ items: Room[]; total: number }>;
}
