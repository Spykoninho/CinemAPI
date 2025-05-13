import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class ResponseTicketDto {
    @ApiProperty({
        description: 'Ticket id',
        example: 1,
    })
    id: number;

    @ApiProperty({
        description: 'Session id',
        example: '1',
    })
    sessionId: number;

    @ApiProperty({
        description: 'User id',
        example: '1',
    })
    userId: number;

    @ApiProperty({
        description: 'Purchase date',
        example: '2023-01-01T00:00:00.000Z',
    })
    purchaseDate: Date;

    @ApiProperty({
        description: 'Is super ticket',
        example: true,
    })
    isSuperTicket: boolean;

    @ApiProperty({
        description: 'Remaining sessions',
        example: 5,
    })
    remainingSessions: number;
}

export class RequestTicketDto {
    @ApiProperty({
        description: 'Session id',
        example: '1',
    })
    sessionId: number | null;

    @ApiProperty({
        description: 'Is super ticket',
        example: true,
    })
    @IsBoolean()
    isSuperTicket: boolean;
}
