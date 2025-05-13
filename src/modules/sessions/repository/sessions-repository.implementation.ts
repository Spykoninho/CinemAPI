import { SessionsRepository } from '../domain/sessions.repository';
import { DataSource } from 'typeorm';
import {
    UpsertSession,
    GetSessionsQueryParams,
    Session,
} from '../domain/sessions.model';
import { SessionsEntity } from '../../../core/entities/sessions.entity';
import { SessionsAdapter } from '../adapters/sessions.adapter';
import { isNotNull } from '../../../utils/tools';
import { RoomEntity } from '../../../core/entities/room.entity';
import { TicketEntity } from '../../../core/entities/ticket.entity';

export class SessionsRepositoryImplementation implements SessionsRepository {
    constructor(private dataSource: DataSource) {}

    private filterByDateRange(
        queryBuilder: any,
        startSession?: string,
        endSession?: string,
    ) {
        if (isNotNull(startSession)) {
            queryBuilder.andWhere('start_session >= :start_session', {
                start_session: startSession,
            });
        }

        if (isNotNull(endSession)) {
            queryBuilder.andWhere('end_session <= :end_session', {
                end_session: endSession,
            });
        }
    }

    private filterByRoom(queryBuilder: any, roomId?: number) {
        if (isNotNull(roomId)) {
            queryBuilder.andWhere('sessions.id_room = :roomId', {
                roomId,
            });
        }
    }

    private filterBySession(queryBuilder: any, sessionId?: number) {
        if (isNotNull(sessionId)) {
            queryBuilder.andWhere('sessions.id = :sessionId', {
                sessionId,
            });
        }
    }

    async createSession(movie: UpsertSession): Promise<Session> {
        const sessionsEntity = await this.dataSource
            .getRepository(SessionsEntity)
            .save({
                start_session: movie.startSession,
                end_session: movie.endSession,
                id_movie: movie.idMovie,
                id_room: movie.idRoom,
            });
        return SessionsAdapter.entityToDomain(sessionsEntity);
    }

    async findAndCountSession(
        params: GetSessionsQueryParams,
        page: number,
        limit: number,
    ): Promise<[Session[], number]> {
        const queryBuilder = this.dataSource
            .getRepository(SessionsEntity)
            .createQueryBuilder('sessions')
            .leftJoin('rooms', 'room', 'room.id = sessions.id_room')
            .where('room.maintenance = false');

        if (isNotNull(params.startSession)) {
            queryBuilder.andWhere('start_session >= :start_session', {
                start_session: params.startSession,
            });
        }

        if (isNotNull(params.endSession)) {
            queryBuilder.andWhere('end_session <= :end_session', {
                end_session: params.endSession,
            });
        }

        if (isNotNull(params.filterBy)) {
            const [type, value] = params.filterBy.split(':');
            switch (type) {
                case 'roomId':
                    queryBuilder.andWhere('sessions.id_room = :value', {
                        value: parseInt(value),
                    });
                    break;
                case 'sessionId':
                    queryBuilder.andWhere('sessions.id = :value', {
                        value: parseInt(value),
                    });
                    break;
            }
        }

        const [sessions, count] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .getManyAndCount();

        return [
            sessions.map((session) => SessionsAdapter.entityToDomain(session)),
            count,
        ];
    }

    async getSessionById(id: number): Promise<Session | null> {
        const session = await this.dataSource
            .getRepository(SessionsEntity)
            .findOneBy({ id });

        if (session) {
            return SessionsAdapter.entityToDomain(session);
        }

        return null;
    }

    async getSessionByIdWithMovie(id: number): Promise<Session | null> {
        const session = await this.dataSource
            .getRepository(SessionsEntity)
            .findOne({ where: { id: id }, relations: ['movie'] });

        if (session) {
            return SessionsAdapter.entityToDomain(session);
        }

        return null;
    }

    async deleteSession(id: number): Promise<void> {
        await this.dataSource
            .createQueryBuilder()
            .delete()
            .from(SessionsEntity)
            .where('id = :id', { id })
            .execute();
    }

    async updateSession(id: number, session: UpsertSession): Promise<void> {
        await this.dataSource.getRepository(SessionsEntity).update(
            { id },
            {
                start_session: session.startSession,
                end_session: session.endSession,
                id_movie: session.idMovie,
                id_room: session.idRoom,
            },
        );
    }

    async getSessionsByRoomId(
        idRoom: number,
        startSession: string,
        endSession: string,
    ): Promise<Session[]> {
        const sessions = await this.dataSource
            .getRepository(SessionsEntity)
            .createQueryBuilder('sessions')
            .where('sessions.id_room = :idRoom', { idRoom })
            .andWhere(
                '(sessions.start_session < :endSession AND sessions.end_session > :startSession)',
                {
                    startSession,
                    endSession,
                },
            )
            .getMany();

        return sessions.map((session) =>
            SessionsAdapter.entityToDomain(session),
        );
    }

    async getRemainingSeatInSession(idSession: number): Promise<number> {
        const session = await this.dataSource
            .getRepository(SessionsEntity)
            .findOneBy({ id: idSession });

        if (!session) {
            return 0;
        }

        const room = await this.dataSource
            .getRepository(RoomEntity)
            .findOneBy({ id: session.id_room });

        if (!room) {
            return 0;
        }

        const bookedSeats = await this.dataSource
            .getRepository(TicketEntity)
            .count({ where: { sessionId: idSession } });

        return room.capacity - bookedSeats;
    }
}
