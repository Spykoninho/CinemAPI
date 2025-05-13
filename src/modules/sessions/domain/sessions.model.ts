import { Movie } from '../../movies/domain/movie.model';

export interface Session {
    id: number;
    startSession: string;
    endSession: string;
    idMovie: number;
    idRoom: number;
    movie: Movie;
}

export interface UpsertSession {
    startSession: string;
    endSession: string;
    idMovie: number;
    idRoom: number;
}

export interface GetSessionsQueryParams {
    startSession?: string;
    endSession?: string;
    filterBy?: string;
}
