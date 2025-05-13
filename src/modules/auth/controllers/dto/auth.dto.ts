import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LogInSignInDto {
    @ApiProperty({
        example: 'name@gmail.com',
        description: 'The email of the User',
    })
    @Type(() => String)
    @IsEmail()
    email: string;

    @ApiProperty({
        example: 'password',
        description: 'The password of the User',
    })
    @Type(() => String)
    @MinLength(8)
    password: string;
}

export class RefreshTokenDto {
    @ApiProperty({
        example: 'refresh_token',
        description: 'The refresh token',
    })
    @IsString()
    refresh_token: string;
}

export class LogInSignInDtoOutput {
    @ApiProperty({
        example: 'jwt',
        description: 'The jwt token',
    })
    @IsString()
    access_token: string;

    @ApiProperty({
        example: 'jwt',
        description: 'The jwt token',
    })
    @IsString()
    refresh_token: string;
}
