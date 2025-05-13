import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatisticsService } from '../services/statistics.service';
import {
    ApiTags,
    ApiOperation,
    ApiQuery,
    ApiResponse,
    ApiBearerAuth,
} from '@nestjs/swagger';
import {
    OccupancyStatisticDto,
    MoviePopularityStatisticDto,
    RevenueStatisticDto,
    RoomPerformanceStatisticDto,
    UserActivityStatisticDto,
} from './dto/statistics.dto';
import { IsLoginGuard } from '../../../middlewares/is-login.middleware';
import { IsAdminGuard } from '../../../middlewares/is-admin.middleware';

@ApiTags('Statistics')
@ApiBearerAuth()
@UseGuards(IsLoginGuard, IsAdminGuard)
@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get('occupancy/real-time')
    @ApiOperation({ summary: 'Get real-time occupancy statistics' })
    @ApiResponse({
        status: 200,
        description: 'Returns real-time occupancy statistics',
        type: [OccupancyStatisticDto],
    })
    async getRealTimeOccupancy() {
        return this.statisticsService.getRealTimeOccupancy();
    }

    @Get('occupancy/daily')
    @ApiOperation({ summary: 'Get daily occupancy statistics' })
    @ApiQuery({ name: 'date', required: true, type: String })
    @ApiResponse({
        status: 200,
        description: 'Returns daily occupancy statistics',
        type: [OccupancyStatisticDto],
    })
    async getDailyOccupancy(@Query('date') date: string) {
        return this.statisticsService.getDailyOccupancy(new Date(date));
    }

    @Get('occupancy/weekly')
    @ApiOperation({ summary: 'Get weekly occupancy statistics' })
    @ApiQuery({ name: 'startDate', required: true, type: String })
    @ApiResponse({
        status: 200,
        description: 'Returns weekly occupancy statistics',
        type: [OccupancyStatisticDto],
    })
    async getWeeklyOccupancy(@Query('startDate') startDate: string) {
        return this.statisticsService.getWeeklyOccupancy(new Date(startDate));
    }

    @Get('occupancy/period')
    @ApiOperation({ summary: 'Get occupancy statistics for a specific period' })
    @ApiQuery({ name: 'startDate', required: true, type: String })
    @ApiQuery({ name: 'endDate', required: true, type: String })
    @ApiResponse({
        status: 200,
        description: 'Returns occupancy statistics for a specific period',
        type: [OccupancyStatisticDto],
    })
    async getPeriodOccupancy(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.statisticsService.getPeriodOccupancy(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('movies/popularity')
    @ApiOperation({ summary: 'Get movie popularity statistics' })
    @ApiQuery({
        name: 'period',
        required: false,
        enum: ['day', 'week', 'month', 'year'],
    })
    @ApiResponse({
        status: 200,
        description: 'Returns movie popularity statistics',
        type: [MoviePopularityStatisticDto],
    })
    async getMoviePopularity(@Query('period') period: string = 'month') {
        return this.statisticsService.getMoviePopularity(period);
    }

    @Get('revenue/daily')
    @ApiOperation({ summary: 'Get daily revenue statistics' })
    @ApiQuery({ name: 'date', required: true, type: String })
    @ApiResponse({
        status: 200,
        description: 'Returns daily revenue statistics',
        type: [RevenueStatisticDto],
    })
    async getDailyRevenue(@Query('date') date: string) {
        return this.statisticsService.getDailyRevenue(new Date(date));
    }

    @Get('revenue/period')
    @ApiOperation({ summary: 'Get revenue statistics for a specific period' })
    @ApiQuery({ name: 'startDate', required: true, type: String })
    @ApiQuery({ name: 'endDate', required: true, type: String })
    @ApiResponse({
        status: 200,
        description: 'Returns revenue statistics for a specific period',
        type: [RevenueStatisticDto],
    })
    async getPeriodRevenue(
        @Query('startDate') startDate: string,
        @Query('endDate') endDate: string,
    ) {
        return this.statisticsService.getPeriodRevenue(
            new Date(startDate),
            new Date(endDate),
        );
    }

    @Get('rooms/performance')
    @ApiOperation({ summary: 'Get room performance statistics' })
    @ApiQuery({
        name: 'period',
        required: false,
        enum: ['day', 'week', 'month'],
    })
    @ApiResponse({
        status: 200,
        description: 'Returns room performance statistics',
        type: [RoomPerformanceStatisticDto],
    })
    async getRoomPerformance(@Query('period') period: string = 'month') {
        return this.statisticsService.getRoomPerformance(period);
    }

    @Get('users/activity')
    @ApiOperation({ summary: 'Get user activity statistics' })
    @ApiQuery({
        name: 'period',
        required: false,
        enum: ['day', 'week', 'month'],
    })
    @ApiResponse({
        status: 200,
        description: 'Returns user activity statistics',
        type: [UserActivityStatisticDto],
    })
    async getUserActivity(@Query('period') period: string = 'month') {
        return this.statisticsService.getUserActivity(period);
    }
}
