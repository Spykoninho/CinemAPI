import { CreateRoomImage, RoomImage } from './room-image.model';

export abstract class RoomImagesRepository {
    abstract getRoomImages(roomId: number): Promise<RoomImage[]>;
    abstract getRoomImageById(id: number): Promise<RoomImage>;
    abstract createRoomImage(image: CreateRoomImage): Promise<RoomImage>;
    abstract deleteRoomImage(id: number): Promise<void>;
}
