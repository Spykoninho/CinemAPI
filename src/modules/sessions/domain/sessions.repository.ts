import {
    UpsertSession,
    GetSessionsQueryParams,
    Session,
} from './sessions.model';

export abstract class SessionsRepository {
    abstract createSession(movie: UpsertSession): Promise<Session>;
    abstract getSessionById(id: number): Promise<Session | null>;
    abstract getSessionByIdWithMovie(id: number): Promise<Session | null>;
    abstract findAndCountSession(
        params: GetSessionsQueryParams,
        page: number,
        skip: number,
    ): Promise<[Session[], number]>;
    abstract deleteSession(id: number): Promise<void>;
    abstract updateSession(
        id: number,
        session: Partial<UpsertSession>,
    ): Promise<void>;
    abstract getSessionsByRoomId(
        idRoom: number,
        startSession: string,
        endSession: string,
    ): Promise<Session[]>;
    abstract getRemainingSeatInSession(idSession: number): Promise<number>;
}
