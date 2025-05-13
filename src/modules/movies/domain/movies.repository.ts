import {
    CreateMovie,
    GetMoviesQueryParams,
    Movie,
    UpdateMovie,
} from './movie.model';

export abstract class MoviesRepository {
    abstract findAndCountMovies(
        params: GetMoviesQueryParams,
        page: number,
        skip: number,
    ): Promise<[Movie[], number]>;
    abstract getMovieById(id: number): Promise<Movie | null>;
    abstract createMovie(movie: CreateMovie): Promise<Movie>;
    abstract updateMovie(id: number, movie: UpdateMovie): Promise<void>;
    abstract deleteMovie(id: number): Promise<void>;
}
