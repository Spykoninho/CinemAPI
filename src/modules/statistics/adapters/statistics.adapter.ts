import {
    OccupancyStatistic,
    MoviePopularityStatistic,
    RevenueStatistic,
    RoomPerformanceStatistic,
    UserActivityStatistic,
} from '../domain/statistics.model';

export class StatisticsAdapter {
    static domainToOccupancyDto(statistic: OccupancyStatistic) {
        return {
            sessionId: statistic.sessionId,
            roomId: statistic.roomId,
            occupancyRate: statistic.occupancyRate,
            totalSeats: statistic.totalSeats,
            occupiedSeats: statistic.occupiedSeats,
            date: statistic.date,
        };
    }

    static domainToMoviePopularityDto(statistic: MoviePopularityStatistic) {
        return {
            movieId: statistic.movieId,
            title: statistic.title,
            totalSessions: statistic.totalSessions,
            totalOccupancy: statistic.totalOccupancy,
            averageOccupancy: statistic.averageOccupancy,
        };
    }

    static domainToRevenueDto(statistic: RevenueStatistic) {
        return {
            date: statistic.date,
            amount: statistic.amount,
        };
    }

    static domainToRoomPerformanceDto(statistic: RoomPerformanceStatistic) {
        return {
            roomId: statistic.roomId,
            totalSessions: statistic.totalSessions,
            totalOccupancy: statistic.totalOccupancy,
            averageOccupancy: statistic.averageOccupancy,
            totalRevenue: statistic.totalRevenue,
        };
    }

    static domainToUserActivityDto(statistic: UserActivityStatistic) {
        return {
            date: statistic.date,
            totalTickets: statistic.totalTickets,
            superTickets: statistic.superTickets,
            regularTickets: statistic.regularTickets,
        };
    }

    static listDomainToOccupancyDto(statistics: OccupancyStatistic[]) {
        return statistics.map((statistic) =>
            this.domainToOccupancyDto(statistic),
        );
    }

    static listDomainToMoviePopularityDto(
        statistics: MoviePopularityStatistic[],
    ) {
        return statistics.map((statistic) =>
            this.domainToMoviePopularityDto(statistic),
        );
    }

    static listDomainToRevenueDto(statistics: RevenueStatistic[]) {
        return statistics.map((statistic) =>
            this.domainToRevenueDto(statistic),
        );
    }

    static listDomainToRoomPerformanceDto(
        statistics: RoomPerformanceStatistic[],
    ) {
        return statistics.map((statistic) =>
            this.domainToRoomPerformanceDto(statistic),
        );
    }

    static listDomainToUserActivityDto(statistics: UserActivityStatistic[]) {
        return statistics.map((statistic) =>
            this.domainToUserActivityDto(statistic),
        );
    }
}
