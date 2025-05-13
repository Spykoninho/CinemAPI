import { Injectable } from '@nestjs/common';
import { SessionsRepository } from '../domain/sessions.repository';
import {
    CreateSessionDto,
    UpdateSessionDto,
} from '../controllers/dto/sessions.dto';
import { SessionsAdapter } from '../adapters/sessions.adapter';
import { MoviesRepository } from '../../movies/domain/movies.repository';
import { isNotNull, isNull } from '../../../utils/tools';
import { CineError } from '../../../utils/CineError';
import { RoomsRepository } from '../../rooms/domain/rooms.repository';
import {
    GetSessionsQueryParams,
    Session,
    UpsertSession,
} from '../domain/sessions.model';
import * as dayjs from 'dayjs';
import { UsersRepository } from '../../users/domain/users.abstract.repository';
import { TicketsRepository } from '../../tickets/domain/tickets.abstract.repository';

const SESSION_STEP = 30; // minutes
const CINEMA_OPENING_HOUR = 9; // hour
const CINEMA_CLOSING_HOUR = 20; // hour

@Injectable()
export class SessionsService {
    constructor(
        private readonly sessionsRepository: SessionsRepository,
        private readonly moviesRepository: MoviesRepository,
        private readonly roomsRepository: RoomsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly ticketsRepository: TicketsRepository,
    ) {}

    async createSession(createSessionDto: CreateSessionDto) {
        const movie = await this.moviesRepository.getMovieById(
            createSessionDto.idMovie,
        );

        if (isNull(movie)) {
            throw new CineError('movie_not_found', 'Movie not found', 404, {
                movieId: createSessionDto.idMovie,
            });
        }

        const room = await this.roomsRepository.getRoomById(
            createSessionDto.idRoom,
        );

        if (isNull(room)) {
            throw new CineError('room_not_found', 'Room not found', 404, {
                roomId: createSessionDto.idRoom,
            });
        }

        const movieDuration = movie.duration;
        const endOfSession = dayjs(createSessionDto.startSession)
            .add(movieDuration, 'minute')
            .add(SESSION_STEP, 'minute');

        const session: UpsertSession = SessionsAdapter.createSessionDtoToDomain(
            {
                startSession: createSessionDto.startSession,
                idRoom: createSessionDto.idRoom,
                idMovie: createSessionDto.idMovie,
            },
            endOfSession.toISOString(),
        );

        this.checkSessionTime(
            createSessionDto.startSession,
            endOfSession.toISOString(),
        );
        await this.checkIfAnotherSessionExists(
            createSessionDto.startSession,
            endOfSession.toISOString(),
            createSessionDto.idRoom,
        );

        return this.sessionsRepository.createSession(session);
    }

    private validateQueryParams(params: GetSessionsQueryParams): void {
        if (params.startSession && params.endSession) {
            const start = dayjs(params.startSession);
            const end = dayjs(params.endSession);

            if (start.isAfter(end)) {
                throw new CineError(
                    'invalid_query_params',
                    'Start session must be before end session',
                    400,
                    {
                        startSession: params.startSession,
                        endSession: params.endSession,
                    },
                );
            }
        }

        if (params.filterBy) {
            const [type, value] = params.filterBy.split(':');
            if (!type || !value || !['roomId', 'sessionId'].includes(type)) {
                throw new CineError(
                    'invalid_filter',
                    'Invalid filter format. Must be "roomId:value" or "sessionId:value"',
                    400,
                    {
                        filterBy: params.filterBy,
                    },
                );
            }

            if (isNaN(parseInt(value))) {
                throw new CineError(
                    'invalid_filter_value',
                    'Filter value must be a number',
                    400,
                    {
                        filterBy: params.filterBy,
                        value,
                    },
                );
            }
        }
    }

    async getSessions(
        getSessionsQueryParams: GetSessionsQueryParams,
        page: number,
        limit: number,
    ) {
        this.validateQueryParams(getSessionsQueryParams);

        const [sessions, count] =
            await this.sessionsRepository.findAndCountSession(
                getSessionsQueryParams,
                page,
                limit,
            );

        return {
            sessions,
            count,
        };
    }

    async getSessionsByUserEmail(email: string, page: number, limit: number) {
        const user = await this.usersRepository.findByEmail(email);
        if (isNull(user)) {
            throw new CineError('user_not_found', 'User not found', 404, {
                email,
            });
        }
        const offset = page * limit - limit;

        const [tickets, count] =
            await this.ticketsRepository.getTicketsByUserId(
                user.id,
                limit,
                offset,
            );

        const returnedSessions: Session[] = [];
        for (const ticket of tickets) {
            const session =
                await this.sessionsRepository.getSessionByIdWithMovie(
                    ticket.sessionId,
                );

            if (isNull(session)) {
                throw new CineError(
                    'session_not_found',
                    'Session not found',
                    404,
                    {
                        sessionId: ticket.sessionId,
                    },
                );
            }
            returnedSessions.push(session);
        }

        return {
            returnedSessions,
            count,
        };
    }

    async getSession(id: number) {
        const session = await this.sessionsRepository.getSessionById(id);

        if (isNull(session)) {
            throw new CineError('session_not_found', 'Session not found', 404, {
                sessionId: id,
            });
        }

        return session;
    }

    async deleteSession(id: number) {
        const session = await this.sessionsRepository.getSessionById(id);

        if (isNull(session)) {
            throw new CineError('session_not_found', 'Session not found', 404, {
                sessionId: id,
            });
        }

        return this.sessionsRepository.deleteSession(id);
    }

    async getRemainingSeats(id: number) {
        const session = await this.sessionsRepository.getSessionById(id);

        if (isNull(session)) {
            throw new CineError('session_not_found', 'Session not found', 404, {
                sessionId: id,
            });
        }

        return this.sessionsRepository.getRemainingSeatInSession(id);
    }

    async updateSession(id: number, updateSessionDto: UpdateSessionDto) {
        if (
            isNull(updateSessionDto.startSession) &&
            isNull(updateSessionDto.idMovie) &&
            isNull(updateSessionDto.idRoom)
        ) {
            throw new CineError('invalid_data', 'Invalid data', 400, {
                message: 'At least one field must be filled',
            });
        }

        const session = await this.sessionsRepository.getSessionById(id);

        if (isNull(session)) {
            throw new CineError('session_not_found', 'Session not found', 404, {
                sessionId: id,
            });
        }

        let sessionToUpdate: Partial<UpsertSession> = {};
        const movieId = updateSessionDto.idMovie || session.idMovie;
        const startTime = updateSessionDto.startSession || session.startSession;

        const isStartSessionModified = isNotNull(updateSessionDto.startSession);
        const isMovieModified = isNotNull(updateSessionDto.idMovie);
        const needToUpdateEndSession =
            isStartSessionModified || isMovieModified;

        if (needToUpdateEndSession) {
            const movie = await this.moviesRepository.getMovieById(movieId);

            if (isNull(movie)) {
                throw new CineError('movie_not_found', 'Movie not found', 404, {
                    movieId: movieId,
                });
            }

            const movieDuration = movie.duration;
            const endOfSession = dayjs(startTime)
                .add(movieDuration, 'minute')
                .add(SESSION_STEP, 'minute');

            sessionToUpdate = SessionsAdapter.updateSessionDtoToDomain(
                updateSessionDto,
                endOfSession.toISOString(),
            );

            if (isStartSessionModified) {
                sessionToUpdate.startSession = startTime;
            }
        } else {
            sessionToUpdate = SessionsAdapter.updateSessionDtoToDomain(
                updateSessionDto,
                undefined,
            );
        }

        if (updateSessionDto.idRoom) {
            const room = await this.roomsRepository.getRoomById(
                updateSessionDto.idRoom,
            );

            if (isNull(room)) {
                throw new CineError('room_not_found', 'Room not found', 404, {
                    roomId: updateSessionDto.idRoom,
                });
            }
        }

        this.checkSessionTime(
            sessionToUpdate.startSession || session.startSession,
            sessionToUpdate.endSession || session.endSession,
        );

        await this.checkIfAnotherSessionExists(
            sessionToUpdate.startSession || session.startSession,
            sessionToUpdate.endSession || session.endSession,
            updateSessionDto.idRoom || session.idRoom,
            id,
        );

        return this.sessionsRepository.updateSession(id, sessionToUpdate);
    }

    private checkSessionTime(startSession: string, endSession: string): void {
        const start = dayjs(startSession);
        const end = dayjs(endSession);

        // Vérifier que la date de début est avant la date de fin
        if (start.isAfter(end)) {
            throw new CineError(
                'invalid_session_time',
                'Start session must be before end session',
                400,
                {
                    startSession,
                    endSession,
                },
            );
        }

        // Vérifier que la session est dans les heures d'ouverture
        const startHour = start.hour();
        const endHour = end.hour();

        if (startHour < CINEMA_OPENING_HOUR || endHour > CINEMA_CLOSING_HOUR) {
            throw new CineError(
                'invalid_session_time',
                `Session must be between ${CINEMA_OPENING_HOUR}:00 and ${CINEMA_CLOSING_HOUR}:00`,
                400,
                {
                    startSession,
                    endSession,
                    startHour,
                    endHour,
                },
            );
        }

        // Vérifier que la session n'est pas dans le passé
        if (start.isBefore(dayjs())) {
            throw new CineError(
                'invalid_session_time',
                'Session cannot be in the past',
                400,
                {
                    startSession,
                    endSession,
                },
            );
        }
    }

    async checkIfAnotherSessionExists(
        startSession: string,
        endSession: string,
        idRoom: number,
        sessionIdToExclude?: number,
    ): Promise<void> {
        let sessions = await this.sessionsRepository.getSessionsByRoomId(
            idRoom,
            startSession,
            endSession,
        );

        if (sessionIdToExclude) {
            sessions = sessions.filter(
                (session) => session.id !== sessionIdToExclude,
            );
        }

        if (sessions.length > 0) {
            throw new CineError(
                'session_exists',
                'Session already exists in this time slot',
                409,
                {
                    startSession,
                    endSession,
                    idRoom,
                    sessions: sessions.map((session) => ({
                        id: session.id,
                        startSession: session.startSession,
                        endSession: session.endSession,
                    })),
                },
            );
        }

        return;
    }
}
