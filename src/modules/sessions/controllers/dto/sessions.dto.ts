import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsISO8601, IsOptional, IsString, Min } from 'class-validator';

export class SessionsDto {
    @ApiProperty({
        description: 'Session id',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Session start date',
        example: '2023-10-01T10:00:00Z',
    })
    startSession: string;

    @ApiProperty({
        description: 'Session end date',
        example: '2023-10-01T12:00:00Z',
    })
    endSession: string;

    @ApiProperty({
        description: 'Movie id',
        example: 1,
    })
    idMovie: number;

    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    idRoom: number;
}

export class GetSessionDto {
    @ApiProperty({
        description: 'Session id',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    id: number;
}

export class CreateSessionDto {
    @ApiProperty({
        description: 'Session start date',
        example: '2023-10-01T10:00:00Z',
    })
    @IsISO8601()
    startSession: string;

    @ApiProperty({
        description: 'Movie id',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    idMovie: number;

    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    idRoom: number;
}

export class UpdateSessionDto {
    @ApiProperty({
        description: 'Session start date',
        example: '2023-10-01T10:00:00Z',
    })
    @IsISO8601()
    @IsOptional()
    startSession?: string;

    @ApiProperty({
        description: 'Movie id',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    idMovie?: number;

    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    idRoom?: number;
}

export class GetSessionsQueryParamsDto {
    @ApiProperty({
        description: 'Session start date',
        example: '2023-10-01T10:00:00Z',
        required: false,
    })
    @IsISO8601()
    @IsOptional()
    startSession?: string;

    @ApiProperty({
        description: 'Session end date',
        example: '2025-10-01T12:00:00Z',
        required: false,
    })
    @IsISO8601()
    @IsOptional()
    endSession?: string;

    @ApiProperty({
        description: 'Filter by room or session id',
        example: 'roomId:1',
        required: false,
        enum: ['roomId:1', 'roomId:2', 'sessionId:1', 'sessionId:2'],
    })
    @IsOptional()
    filterBy?: 'roomId:1' | 'roomId:2' | 'sessionId:1' | 'sessionId:2';
}

export class GetSessionHistoryByEmailDto {
    @ApiProperty({
        description: 'User email',
        example: 'email',
    })
    @IsString()
    email: string;
}
