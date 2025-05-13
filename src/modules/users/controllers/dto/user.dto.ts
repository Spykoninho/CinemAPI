import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsInt, IsString, Min } from 'class-validator';
import { UserRoleEnum } from '../../domain/user-role.enum';

export class ResponseUserDto {
    @ApiProperty({
        example: 'name@gmail.com',
        description: 'The email of the User',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '100',
        description: 'The money of the User',
    })
    @IsInt()
    @Type(() => Number)
    money: number;

    @ApiProperty({
        example: 'ADMIN',
        description: 'The role of the User',
    })
    @IsString()
    role: UserRoleEnum;

    // TODO : Ajouter champs d'historique de transaction et de film vues
}

export class DepositMoneyDto {
    @ApiProperty({
        example: '100',
        description: 'The money to add to the User',
    })
    @IsInt()
    @Min(1)
    @Type(() => Number)
    money: number;
}

export class WithdrawMoneyDto {
    @ApiProperty({
        example: '100',
        description: 'The money to withdraw from the User',
    })
    @IsInt()
    @Min(1)
    @Type(() => Number)
    money: number;
}
