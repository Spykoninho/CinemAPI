import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsUrl } from 'class-validator';

export class RoomImageDto {
    @ApiProperty({
        description: 'Image id',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Image URL',
        example: 'https://minio.example.com/bucket/room1.jpg',
    })
    url: string;

    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    roomId: number;

    @ApiProperty({
        description: 'Creation date',
        example: '2024-03-20T10:00:00Z',
    })
    createdAt: Date;

    @ApiProperty({
        description: 'Last update date',
        example: '2024-03-20T10:00:00Z',
    })
    updatedAt: Date;
}

export class CreateRoomImageDto {
    @ApiProperty({
        description: 'Image URL',
        example: 'https://minio.example.com/bucket/room1.jpg',
    })
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    @IsNumber()
    @IsNotEmpty()
    roomId: number;
}
