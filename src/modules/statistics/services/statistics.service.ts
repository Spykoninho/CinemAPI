import { Injectable } from '@nestjs/common';
import { StatisticsRepository } from '../domain/statistics.repository';
import {
    OccupancyStatistic,
    MoviePopularityStatistic,
    RevenueStatistic,
    RoomPerformanceStatistic,
    UserActivityStatistic,
} from '../domain/statistics.model';

@Injectable()
export class StatisticsService {
    constructor(private readonly statisticsRepository: StatisticsRepository) {}

    async getRealTimeOccupancy(): Promise<OccupancyStatistic[]> {
        return this.statisticsRepository.getRealTimeOccupancy();
    }

    async getDailyOccupancy(date: Date): Promise<OccupancyStatistic[]> {
        return this.statisticsRepository.getDailyOccupancy(date);
    }

    async getWeeklyOccupancy(startDate: Date): Promise<OccupancyStatistic[]> {
        return this.statisticsRepository.getWeeklyOccupancy(startDate);
    }

    async getPeriodOccupancy(
        startDate: Date,
        endDate: Date,
    ): Promise<OccupancyStatistic[]> {
        return this.statisticsRepository.getPeriodOccupancy(startDate, endDate);
    }

    async getMoviePopularity(
        period: string,
    ): Promise<MoviePopularityStatistic[]> {
        return this.statisticsRepository.getMoviePopularity(period);
    }

    async getDailyRevenue(date: Date): Promise<RevenueStatistic[]> {
        return this.statisticsRepository.getDailyRevenue(date);
    }

    async getPeriodRevenue(
        startDate: Date,
        endDate: Date,
    ): Promise<RevenueStatistic[]> {
        return this.statisticsRepository.getPeriodRevenue(startDate, endDate);
    }

    async getRoomPerformance(
        period: string,
    ): Promise<RoomPerformanceStatistic[]> {
        return this.statisticsRepository.getRoomPerformance(period);
    }

    async getUserActivity(period: string): Promise<UserActivityStatistic[]> {
        return this.statisticsRepository.getUserActivity(period);
    }
}
