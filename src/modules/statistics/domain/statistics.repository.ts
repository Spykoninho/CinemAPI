import {
    OccupancyStatistic,
    MoviePopularityStatistic,
    RevenueStatistic,
    RoomPerformanceStatistic,
    UserActivityStatistic,
} from './statistics.model';

export abstract class StatisticsRepository {
    abstract getRealTimeOccupancy(): Promise<OccupancyStatistic[]>;
    abstract getDailyOccupancy(date: Date): Promise<OccupancyStatistic[]>;
    abstract getWeeklyOccupancy(startDate: Date): Promise<OccupancyStatistic[]>;
    abstract getPeriodOccupancy(
        startDate: Date,
        endDate: Date,
    ): Promise<OccupancyStatistic[]>;
    abstract getMoviePopularity(
        period: string,
    ): Promise<MoviePopularityStatistic[]>;
    abstract getDailyRevenue(date: Date): Promise<RevenueStatistic[]>;
    abstract getPeriodRevenue(
        startDate: Date,
        endDate: Date,
    ): Promise<RevenueStatistic[]>;
    abstract getRoomPerformance(
        period: string,
    ): Promise<RoomPerformanceStatistic[]>;
    abstract getUserActivity(period: string): Promise<UserActivityStatistic[]>;
}
