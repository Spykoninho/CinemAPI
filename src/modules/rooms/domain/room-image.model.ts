export class RoomImage {
    id: number;
    filename: string;
    roomId: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CreateRoomImage {
    filename: string;
    roomId: number;
}
