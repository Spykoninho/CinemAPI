import { MoviesRepository } from '../domain/movies.repository';
import { DataSource } from 'typeorm';
import { MovieEntity } from '../../../core/entities/movie.entity';
import { MoviesAdapter } from '../adapters/movies.adapter';
import {
    CreateMovie,
    GetMoviesQueryParams,
    Movie,
    UpdateMovie,
} from '../domain/movie.model';
import { isNotNull, isNull } from '../../../utils/tools';

export class MoviesRepositoryImplementation implements MoviesRepository {
    constructor(private dataSource: DataSource) {}

    async findAndCountMovies(
        params: GetMoviesQueryParams,
        page: number,
        limit: number,
    ): Promise<[Movie[], number]> {
        const queryBuilder = this.dataSource
            .getRepository(MovieEntity)
            .createQueryBuilder('movie');

        if (isNotNull(params.match)) {
            queryBuilder.where('movie.name ILIKE :name', {
                name: `%${params.match}%`,
            });
        }

        const [movies, count] = await queryBuilder
            .skip((page - 1) * limit)
            .take(limit)
            .orderBy('movie.id', 'ASC')
            .getManyAndCount();

        return [
            movies.map((movie) => MoviesAdapter.entityToDomain(movie)),
            count,
        ];
    }

    async getMovieById(id: number): Promise<Movie | null> {
        const movie = await this.dataSource
            .getRepository(MovieEntity)
            .findOne({ where: { id } });

        if (isNull(movie)) {
            return null;
        }

        return MoviesAdapter.entityToDomain(movie);
    }

    async createMovie(movie: CreateMovie): Promise<Movie> {
        const savedEntity: MovieEntity = await this.dataSource
            .getRepository(MovieEntity)
            .save({
                name: movie.name,
                description: movie.description,
                duration: movie.duration,
            });
        return MoviesAdapter.entityToDomain(savedEntity);
    }

    async updateMovie(id: number, movie: UpdateMovie): Promise<void> {
        await this.dataSource.getRepository(MovieEntity).update(
            { id },
            {
                name: movie.name,
                description: movie.description,
                duration: movie.duration,
            },
        );
    }

    async deleteMovie(id: number): Promise<void> {
        await this.dataSource.getRepository(MovieEntity).delete({ id });
    }
}
