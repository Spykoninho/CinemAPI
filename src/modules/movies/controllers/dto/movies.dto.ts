import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class MovieDto {
    @ApiProperty({
        description: 'Movie id',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Movie name',
        example: 'Cars 1',
    })
    name: string;

    @ApiProperty({
        description: 'Movie description',
        example: 'Le meilleur film de voiture',
    })
    description: string;

    @ApiProperty({
        description: 'Movie duration',
        example: 120,
    })
    duration: number;
}

export class GetMovieDto {
    @ApiProperty({
        description: 'Movie id',
        example: 1,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    id: number;
}

export class GetMoviesQueryParamsDto {
    @ApiProperty({
        description: 'Movie name',
        example: 'Cars',
        required: false,
    })
    @Type(() => String)
    @IsString()
    @IsOptional()
    match?: string;
}

export class CreateMovieDto {
    @ApiProperty({
        description: 'Movie name',
        example: 'Cars 1',
    })
    @Type(() => String)
    @IsString()
    @MinLength(1)
    name: string;

    @ApiProperty({
        description: 'Movie description',
        example: 'Le meilleur film de voiture',
    })
    @Type(() => String)
    @IsString()
    @MinLength(1)
    description: string;

    @ApiProperty({
        description: 'Movie duration',
        example: 120,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    duration: number;
}

export class UpdateMovieDto {
    @ApiProperty({
        description: 'Movie name',
        example: 'Cars 1',
    })
    @Type(() => String)
    @IsString()
    @MinLength(1)
    @IsOptional()
    name?: string;

    @ApiProperty({
        description: 'Movie description',
        example: 'Le meilleur film de voiture',
    })
    @Type(() => String)
    @IsString()
    @MinLength(1)
    @IsOptional()
    description?: string;

    @ApiProperty({
        description: 'Movie duration',
        example: 120,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @IsOptional()
    duration?: number;
}
