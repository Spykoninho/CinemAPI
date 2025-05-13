import { Injectable } from '@nestjs/common';
import { DataSource, Between } from 'typeorm';
import { StatisticsRepository } from '../domain/statistics.repository';
import {
    OccupancyStatistic,
    MoviePopularityStatistic,
    RevenueStatistic,
    RoomPerformanceStatistic,
    UserActivityStatistic,
    GetOccupancyQueryParams,
} from '../domain/statistics.model';
import { SessionsRepository } from '../../sessions/domain/sessions.repository';
import { TicketsRepository } from '../../tickets/domain/tickets.abstract.repository';
import { RoomsRepository } from '../../rooms/domain/rooms.repository';
import { MoviesRepository } from '../../movies/domain/movies.repository';
import { TransactionsEntity } from '../../../core/entities/transactions.entity';
import { TransactionType } from '../../transactions/domain/transaction-type.enum';
import * as dayjs from 'dayjs';

@Injectable()
export class StatisticsRepositoryImplementation
    implements StatisticsRepository
{
    constructor(
        private readonly dataSource: DataSource,
        private readonly sessionsRepository: SessionsRepository,
        private readonly ticketsRepository: TicketsRepository,
        private readonly roomsRepository: RoomsRepository,
        private readonly moviesRepository: MoviesRepository,
    ) {}

    private async filterByRoomAndSession(
        filters?: GetOccupancyQueryParams,
    ): Promise<[any[], number]> {
        return this.sessionsRepository.findAndCountSession(
            {
                startSession: new Date().toISOString(),
                endSession: new Date().toISOString(),
                filterBy: filters?.filterBy,
            },
            1,
            0,
        );
    }

    private async filterByDateRange(
        date: Date,
        filters?: GetOccupancyQueryParams,
    ): Promise<[any[], number]> {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        return this.sessionsRepository.findAndCountSession(
            {
                startSession: startDate.toISOString(),
                endSession: endDate.toISOString(),
                filterBy: filters?.filterBy,
            },
            1,
            0,
        );
    }

    private async filterByWeekRange(
        startDate: Date,
        filters?: GetOccupancyQueryParams,
    ): Promise<[any[], number]> {
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + 7);

        return this.sessionsRepository.findAndCountSession(
            {
                startSession: startDate.toISOString(),
                endSession: endDate.toISOString(),
                filterBy: filters?.filterBy,
            },
            1,
            0,
        );
    }

    private async filterByPeriodRange(
        startDate: Date,
        endDate: Date,
        filters?: GetOccupancyQueryParams,
    ): Promise<[any[], number]> {
        return this.sessionsRepository.findAndCountSession(
            {
                startSession: startDate.toISOString(),
                endSession: endDate.toISOString(),
                filterBy: filters?.filterBy,
            },
            1,
            0,
        );
    }

    async getRealTimeOccupancy(
        filters?: GetOccupancyQueryParams,
    ): Promise<OccupancyStatistic[]> {
        const sessions = await this.filterByRoomAndSession(filters);

        if (sessions[0].length === 0) {
            return [];
        }

        const occupancyData = await Promise.all(
            sessions[0].map(async (session) => {
                const remainingSeats =
                    await this.sessionsRepository.getRemainingSeatInSession(
                        session.id,
                    );
                const room = await this.roomsRepository.getRoomById(
                    session.idRoom,
                );
                const occupancyRate =
                    ((room.capacity - remainingSeats) / room.capacity) * 100;

                return {
                    sessionId: session.id,
                    roomId: session.idRoom,
                    occupancyRate,
                    totalSeats: room.capacity,
                    occupiedSeats: room.capacity - remainingSeats,
                };
            }),
        );

        return occupancyData;
    }

    async getDailyOccupancy(
        date: Date,
        filters?: GetOccupancyQueryParams,
    ): Promise<OccupancyStatistic[]> {
        const sessions = await this.filterByDateRange(date, filters);

        if (sessions[0].length === 0) {
            return [];
        }

        const occupancyData = await Promise.all(
            sessions[0].map(async (session) => {
                const remainingSeats =
                    await this.sessionsRepository.getRemainingSeatInSession(
                        session.id,
                    );
                const room = await this.roomsRepository.getRoomById(
                    session.idRoom,
                );
                const occupancyRate =
                    ((room.capacity - remainingSeats) / room.capacity) * 100;

                return {
                    date: session.startSession,
                    sessionId: session.id,
                    roomId: session.idRoom,
                    occupancyRate,
                    totalSeats: room.capacity,
                    occupiedSeats: room.capacity - remainingSeats,
                };
            }),
        );

        return occupancyData;
    }

    async getWeeklyOccupancy(
        startDate: Date,
        filters?: GetOccupancyQueryParams,
    ): Promise<OccupancyStatistic[]> {
        const sessions = await this.filterByWeekRange(startDate, filters);

        if (sessions[0].length === 0) {
            return [];
        }

        const occupancyData = await Promise.all(
            sessions[0].map(async (session) => {
                const remainingSeats =
                    await this.sessionsRepository.getRemainingSeatInSession(
                        session.id,
                    );
                const room = await this.roomsRepository.getRoomById(
                    session.idRoom,
                );
                const occupancyRate =
                    ((room.capacity - remainingSeats) / room.capacity) * 100;

                return {
                    date: session.startSession,
                    sessionId: session.id,
                    roomId: session.idRoom,
                    occupancyRate,
                    totalSeats: room.capacity,
                    occupiedSeats: room.capacity - remainingSeats,
                };
            }),
        );

        return occupancyData;
    }

    async getPeriodOccupancy(
        startDate: Date,
        endDate: Date,
        filters?: GetOccupancyQueryParams,
    ): Promise<OccupancyStatistic[]> {
        const sessions = await this.filterByPeriodRange(startDate, endDate, filters);

        if (sessions[0].length === 0) {
            return [];
        }

        const occupancyData = await Promise.all(
            sessions[0].map(async (session) => {
                const remainingSeats =
                    await this.sessionsRepository.getRemainingSeatInSession(
                        session.id,
                    );
                const room = await this.roomsRepository.getRoomById(
                    session.idRoom,
                );
                const occupancyRate =
                    ((room.capacity - remainingSeats) / room.capacity) * 100;

                return {
                    date: session.startSession,
                    sessionId: session.id,
                    roomId: session.idRoom,
                    occupancyRate,
                    totalSeats: room.capacity,
                    occupiedSeats: room.capacity - remainingSeats,
                };
            }),
        );

        return occupancyData;
    }

    async getMoviePopularity(
        period: string,
    ): Promise<MoviePopularityStatistic[]> {
        const endDate = new Date();
        const startDate = new Date();

        switch (period) {
            case 'day':
                startDate.setDate(startDate.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
            case 'year':
                startDate.setFullYear(startDate.getFullYear() - 1);
                break;
        }

        const sessions = await this.sessionsRepository.findAndCountSession(
            {
                startSession: startDate.toISOString(),
                endSession: endDate.toISOString(),
            },
            1,
            0,
        );

        if (sessions[0].length === 0) {
            return [];
        }

        const movieStats = new Map<number, MoviePopularityStatistic>();

        for (const session of sessions[0]) {
            const movie = await this.moviesRepository.getMovieById(
                session.idMovie,
            );
            if (!movie) continue;

            const remainingSeats =
                await this.sessionsRepository.getRemainingSeatInSession(
                    session.id,
                );
            const room = await this.roomsRepository.getRoomById(session.idRoom);
            const occupiedSeats = room.capacity - remainingSeats;

            if (!movieStats.has(movie.id)) {
                movieStats.set(movie.id, {
                    movieId: movie.id,
                    title: movie.name || 'Unknown Movie',
                    totalSessions: 0,
                    totalOccupancy: 0,
                    averageOccupancy: 0,
                });
            }

            const stats = movieStats.get(movie.id);
            if (stats) {
                stats.totalSessions++;
                stats.totalOccupancy += occupiedSeats;
                stats.averageOccupancy =
                    stats.totalOccupancy / stats.totalSessions;
            }
        }

        return Array.from(movieStats.values());
    }

    async getDailyRevenue(date: Date): Promise<RevenueStatistic[]> {
        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date(date);
        endDate.setHours(23, 59, 59, 999);

        const [tickets, count] = await this.ticketsRepository.getTicketsByUserId(
            0, // 0 pour récupérer tous les tickets
            1000, // Un nombre élevé pour récupérer tous les tickets
            0,
        );

        const filteredTickets = tickets.filter(
            (ticket) =>
                ticket.purchaseDate >= startDate && ticket.purchaseDate <= endDate,
        );

        if (filteredTickets.length === 0) {
            return [];
        }

        const TICKET_PRICE = 10;
        const totalRevenue = filteredTickets.reduce(
            (sum, ticket) => sum + (ticket.isSuperTicket ? TICKET_PRICE * 10 : TICKET_PRICE),
            0,
        );

        return [
            {
                date: dayjs(date).format('YYYY-MM-DD'),
                amount: totalRevenue,
            },
        ];
    }

    async getPeriodRevenue(
        startDate: Date,
        endDate: Date,
    ): Promise<RevenueStatistic[]> {
        const [tickets, count] = await this.ticketsRepository.getTicketsByUserId(
            0, // 0 pour récupérer tous les tickets
            1000, // Un nombre élevé pour récupérer tous les tickets
            0,
        );

        const filteredTickets = tickets.filter(
            (ticket) =>
                ticket.purchaseDate >= startDate && ticket.purchaseDate <= endDate,
        );

        if (filteredTickets.length === 0) {
            return [];
        }

        const TICKET_PRICE = 10;
        const dailyRevenue = new Map<string, number>();

        for (const ticket of filteredTickets) {
            const date = dayjs(ticket.purchaseDate).format('YYYY-MM-DD');
            const ticketPrice = ticket.isSuperTicket ? TICKET_PRICE * 10 : TICKET_PRICE;
            dailyRevenue.set(
                date,
                (dailyRevenue.get(date) || 0) + ticketPrice,
            );
        }

        return Array.from(dailyRevenue.entries()).map(([date, amount]) => ({
            date,
            amount,
        }));
    }

    async getRoomPerformance(
        period: string,
    ): Promise<RoomPerformanceStatistic[]> {
        const endDate = new Date();
        const startDate = new Date();

        switch (period) {
            case 'day':
                startDate.setDate(startDate.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
        }

        const sessions = await this.sessionsRepository.findAndCountSession(
            {
                startSession: startDate.toISOString(),
                endSession: endDate.toISOString(),
            },
            1,
            0,
        );

        if (sessions[0].length === 0) {
            return [];
        }

        const roomStats = new Map<number, RoomPerformanceStatistic>();

        for (const session of sessions[0]) {
            const room = await this.roomsRepository.getRoomById(session.idRoom);
            const remainingSeats =
                await this.sessionsRepository.getRemainingSeatInSession(
                    session.id,
                );
            const occupiedSeats = room.capacity - remainingSeats;
            const occupancyRate = (occupiedSeats / room.capacity) * 100;

            if (!roomStats.has(room.id)) {
                roomStats.set(room.id, {
                    roomId: room.id,
                    totalSessions: 0,
                    totalOccupancy: 0,
                    averageOccupancy: 0,
                    totalRevenue: 0,
                });
            }

            const stats = roomStats.get(room.id);
            if (stats) {
                stats.totalSessions++;
                stats.totalOccupancy += occupancyRate;
                stats.averageOccupancy =
                    stats.totalOccupancy / stats.totalSessions;
            }
        }

        return Array.from(roomStats.values());
    }

    async getUserActivity(period: string): Promise<UserActivityStatistic[]> {
        const endDate = new Date();
        const startDate = new Date();

        switch (period) {
            case 'day':
                startDate.setDate(startDate.getDate() - 1);
                break;
            case 'week':
                startDate.setDate(startDate.getDate() - 7);
                break;
            case 'month':
                startDate.setMonth(startDate.getMonth() - 1);
                break;
        }

        const [tickets, count] = await this.ticketsRepository.getTicketsByUserId(
            0, // 0 pour récupérer tous les tickets
            1000, // Un nombre élevé pour récupérer tous les tickets
            0,
        );

        const filteredTickets = tickets.filter(
            (ticket) =>
                ticket.purchaseDate >= startDate && ticket.purchaseDate <= endDate,
        );

        if (filteredTickets.length === 0) {
            return [];
        }

        const dailyStats = new Map<string, UserActivityStatistic>();

        for (const ticket of filteredTickets) {
            const date = dayjs(ticket.purchaseDate).format('YYYY-MM-DD');
            if (!dailyStats.has(date)) {
                dailyStats.set(date, {
                    date,
                    totalTickets: 0,
                    superTickets: 0,
                    regularTickets: 0,
                });
            }

            const stats = dailyStats.get(date);
            if (stats) {
                stats.totalTickets++;
                if (ticket.isSuperTicket) {
                    stats.superTickets++;
                } else {
                    stats.regularTickets++;
                }
            }
        }

        return Array.from(dailyStats.values());
    }
}
