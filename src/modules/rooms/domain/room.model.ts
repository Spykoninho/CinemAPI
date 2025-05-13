import { RoomType } from './room-type.enum';

export interface RoomImage {
    id: number;
    url: string;
    roomId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class Room {
    public id: number;
    public name: string;
    public description: string;
    public capacity: number;
    public type: RoomType;
    public handicap_friendly: boolean;
    public maintenance: boolean;

    public images?: RoomImage[];
}

export class CreateRoom {
    public name: string;
    public description: string;
    public capacity: number;
    public type: RoomType;
    public handicap_friendly: boolean;
    public maintenance: boolean;
}
