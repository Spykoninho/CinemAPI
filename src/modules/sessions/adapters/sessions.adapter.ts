import {
    UpsertSession,
    GetSessionsQueryParams,
    Session,
} from '../domain/sessions.model';
import {
    CreateSessionDto,
    GetSessionsQueryParamsDto,
    SessionsDto,
    UpdateSessionDto,
} from '../controllers/dto/sessions.dto';
import { SessionsEntity } from '../../../core/entities/sessions.entity';

export class SessionsAdapter {
    static domainToDto(session: Session): SessionsDto {
        return {
            id: session.id,
            startSession: session.startSession,
            endSession: session.endSession,
            idMovie: session.idMovie,
            idRoom: session.idRoom,
        };
    }

    static entityToDomain(session: SessionsEntity): Session {
        return {
            id: session.id,
            startSession: session.start_session,
            endSession: session.end_session,
            idMovie: session.id_movie,
            idRoom: session.id_room,
            movie: session.movie,
        };
    }

    static createSessionDtoToDomain(
        sessionDto: CreateSessionDto,
        end_session: string,
    ): UpsertSession {
        return {
            startSession: sessionDto.startSession,
            endSession: end_session,
            idMovie: sessionDto.idMovie,
            idRoom: sessionDto.idRoom,
        };
    }

    static updateSessionDtoToDomain(
        sessionDto: UpdateSessionDto,
        end_session?: string,
    ): Partial<UpsertSession> {
        return {
            startSession: sessionDto.startSession,
            endSession: end_session ?? undefined,
            idMovie: sessionDto.idMovie,
            idRoom: sessionDto.idRoom,
        };
    }

    static queryParamsDtoToDomain(
        session: GetSessionsQueryParamsDto,
    ): GetSessionsQueryParams {
        return {
            startSession: session.startSession,
            endSession: session.endSession,
            filterBy: session.filterBy,
        };
    }
}
