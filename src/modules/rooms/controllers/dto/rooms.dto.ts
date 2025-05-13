import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Min,
    IsUrl,
    IsNumber,
    IsNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { RoomType } from '../../domain/room-type.enum';

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
}

export class RoomDto {
    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Room name',
        example: 'Room 1',
    })
    name: string;

    @ApiProperty({
        description: 'Room description',
        example: 'best room',
    })
    description: string;

    @ApiProperty({
        description: 'Room capacity',
        example: 30,
    })
    capacity: number;

    @ApiProperty({
        description: 'Room type',

        example: RoomType.STANDARD,
    })
    type: RoomType;

    @ApiProperty({
        description: 'Room is handicap freandly',
        example: true,
    })
    handicap_friendly: boolean;

    @ApiProperty({
        description: 'Room is in maintenance',
        example: true,
    })
    maintenance: boolean;

    @ApiProperty({
        description: 'Room images',
        type: [RoomImageDto],
    })
    images: RoomImageDto[];
}

export class GetRoomDto {
    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    id: number;
}

export class CreateRoomDto {
    @ApiProperty({ example: 'Salle 42' })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Salle très confortable' })
    @IsString()
    description: string;

    @ApiProperty({ example: 40 })
    @IsInt()
    @Min(1)
    capacity: number;

    @ApiProperty({ example: RoomType.FOUR_DX, enum: RoomType })
    @IsEnum(RoomType)
    type: RoomType;

    @ApiProperty({ example: true })
    @IsBoolean()
    handicap_friendly: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    maintenance: boolean;
}

export class UpdateRoomDto {
    @ApiProperty({ example: 'Salle 42' })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ example: 'Salle très confortable' })
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty({ example: 40 })
    @IsInt()
    @Min(1)
    @IsOptional()
    capacity: number;

    @ApiProperty({ example: RoomType.FOUR_DX, enum: RoomType })
    @IsEnum(RoomType)
    @IsOptional()
    type: RoomType;

    @ApiProperty({ example: true })
    @IsBoolean()
    @IsOptional()
    handicap_friendly: boolean;

    @ApiProperty({ example: false })
    @IsBoolean()
    @IsOptional()
    maintenance: boolean;
}

export class GetRoomsQueryDto {
    @ApiProperty({ required: false, description: 'Filter by room capacity' })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    minCapacity?: number;

    @ApiProperty({
        required: false,
        description: 'Filter by room type',
        enum: RoomType,
    })
    @IsOptional()
    @IsEnum(RoomType)
    type?: RoomType;

    @ApiProperty({
        required: false,
        description: 'Filter by maintenance status',
    })
    @IsOptional()
    @Transform(({ value }) => {
        if (value === 'true') return true;
        if (value === 'false') return false;
        return value;
    })
    @IsBoolean()
    maintenance?: boolean;
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
