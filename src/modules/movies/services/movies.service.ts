import { Injectable } from '@nestjs/common';
import { MoviesRepository } from '../domain/movies.repository';
import { CreateMovieDto, UpdateMovieDto } from '../controllers/dto/movies.dto';
import { MoviesAdapter } from '../adapters/movies.adapter';
import { GetMoviesQueryParams, Movie } from '../domain/movie.model';
import { isNull } from '../../../utils/tools';
import { CineError } from '../../../utils/CineError';

@Injectable()
export class MoviesService {
    constructor(private readonly moviesRepository: MoviesRepository) {}

    async getMovies(
        getMoviesQueryParams: GetMoviesQueryParams,
        page: number,
        limit: number,
    ) {
        const [movies, count] = await this.moviesRepository.findAndCountMovies(
            getMoviesQueryParams,
            page,
            limit,
        );

        return {
            movies,
            count,
        };
    }

    async getMovieById(id: number) {
        const movie = await this.moviesRepository.getMovieById(id);

        if (isNull(movie)) {
            throw new CineError('movie_not_found', 'Movie not found', 404, {
                movieId: id,
            });
        }

        return MoviesAdapter.domainToDto(movie);
    }

    async createMovie(createMovieDto: CreateMovieDto): Promise<Movie> {
        const movie = MoviesAdapter.createMovieDtoToDomain(createMovieDto);
        return this.moviesRepository.createMovie(movie);
    }

    async updateMovie(
        id: number,
        updateMovieDto: UpdateMovieDto,
    ): Promise<void> {
        if (
            isNull(updateMovieDto.name) &&
            isNull(updateMovieDto.description) &&
            isNull(updateMovieDto.duration)
        ) {
            throw new CineError('invalid_data', 'Invalid data', 400, {
                message: 'At least one field must be filled',
            });
        }

        if (isNull(await this.moviesRepository.getMovieById(id))) {
            throw new CineError('movie_not_found', 'Movie not found', 404, {
                movieId: id,
            });
        }

        await this.moviesRepository.updateMovie(
            id,
            MoviesAdapter.updateMovieDtoToDomain(updateMovieDto),
        );
    }

    async deleteMovie(id: number): Promise<void> {
        if (isNull(await this.moviesRepository.getMovieById(id))) {
            throw new CineError('movie_not_found', 'Movie not found', 404, {
                movieId: id,
            });
        }
        await this.moviesRepository.deleteMovie(id);
    }
}
