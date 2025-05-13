import { ApiProperty } from '@nestjs/swagger';

export class OccupancyStatisticDto {
    @ApiProperty({
        description: 'Session id',
        example: 1,
    })
    sessionId: number;

    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    roomId: number;

    @ApiProperty({
        description: 'Occupancy rate in percentage',
        example: 75.5,
    })
    occupancyRate: number;

    @ApiProperty({
        description: 'Total number of seats',
        example: 100,
    })
    totalSeats: number;

    @ApiProperty({
        description: 'Number of occupied seats',
        example: 75,
    })
    occupiedSeats: number;

    @ApiProperty({
        description: 'Date of the session',
        example: '2024-04-06T10:00:00Z',
        required: false,
    })
    date?: string;
}

export class MoviePopularityStatisticDto {
    @ApiProperty({
        description: 'Movie id',
        example: 1,
    })
    movieId: number;

    @ApiProperty({
        description: 'Movie title',
        example: 'The Matrix',
    })
    title: string;

    @ApiProperty({
        description: 'Total number of sessions',
        example: 10,
    })
    totalSessions: number;

    @ApiProperty({
        description: 'Total occupancy',
        example: 750,
    })
    totalOccupancy: number;

    @ApiProperty({
        description: 'Average occupancy per session',
        example: 75,
    })
    averageOccupancy: number;
}

export class RevenueStatisticDto {
    @ApiProperty({
        description: 'Date',
        example: '2024-04-06',
    })
    date: string;

    @ApiProperty({
        description: 'Revenue amount',
        example: 1500,
    })
    amount: number;
}

export class RoomPerformanceStatisticDto {
    @ApiProperty({
        description: 'Room id',
        example: 1,
    })
    roomId: number;

    @ApiProperty({
        description: 'Total number of sessions',
        example: 20,
    })
    totalSessions: number;

    @ApiProperty({
        description: 'Total occupancy rate',
        example: 1500,
    })
    totalOccupancy: number;

    @ApiProperty({
        description: 'Average occupancy rate per session',
        example: 75,
    })
    averageOccupancy: number;

    @ApiProperty({
        description: 'Total revenue generated',
        example: 15000,
    })
    totalRevenue: number;
}

export class UserActivityStatisticDto {
    @ApiProperty({
        description: 'Date',
        example: '2024-04-06',
    })
    date: string;

    @ApiProperty({
        description: 'Total number of tickets',
        example: 50,
    })
    totalTickets: number;

    @ApiProperty({
        description: 'Number of super tickets',
        example: 10,
    })
    superTickets: number;

    @ApiProperty({
        description: 'Number of regular tickets',
        example: 40,
    })
    regularTickets: number;
}
