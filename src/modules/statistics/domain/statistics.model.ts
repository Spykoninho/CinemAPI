export interface OccupancyStatistic {
    sessionId: number;
    roomId: number;
    occupancyRate: number;
    totalSeats: number;
    occupiedSeats: number;
    date?: string;
}

export interface MoviePopularityStatistic {
    movieId: number;
    title: string;
    totalSessions: number;
    totalOccupancy: number;
    averageOccupancy: number;
}

export interface RevenueStatistic {
    date: string;
    amount: number;
}

export interface RoomPerformanceStatistic {
    roomId: number;
    totalSessions: number;
    totalOccupancy: number;
    averageOccupancy: number;
    totalRevenue: number;
}

export interface UserActivityStatistic {
    date: string;
    totalTickets: number;
    superTickets: number;
    regularTickets: number;
}

export interface GetStatisticsQueryParams {
    startDate?: string;
    endDate?: string;
    period?: 'day' | 'week' | 'month' | 'year';
}

export interface GetOccupancyQueryParams {
    filterBy?: string;
}
