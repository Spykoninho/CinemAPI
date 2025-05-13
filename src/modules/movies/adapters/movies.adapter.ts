import {
    CreateMovie,
    GetMoviesQueryParams,
    Movie,
    UpdateMovie,
} from '../domain/movie.model';
import {
    CreateMovieDto,
    GetMoviesQueryParamsDto,
    MovieDto,
    UpdateMovieDto,
} from '../controllers/dto/movies.dto';
import { MovieEntity } from '../../../core/entities/movie.entity';

export class MoviesAdapter {
    static domainToDto(movie: Movie): MovieDto {
        return {
            id: movie.id,
            name: movie.name,
            description: movie.description,
            duration: movie.duration,
        };
    }

    static entityToDomain(movieEntity: MovieEntity): Movie {
        return {
            id: movieEntity.id,
            name: movieEntity.name,
            description: movieEntity.description,
            duration: movieEntity.duration,
        };
    }

    static createMovieDtoToDomain(movieDto: CreateMovieDto): CreateMovie {
        return {
            name: movieDto.name,
            description: movieDto.description,
            duration: movieDto.duration,
        };
    }

    static updateMovieDtoToDomain(movieDto: UpdateMovieDto): UpdateMovie {
        return {
            name: movieDto.name,
            description: movieDto.description,
            duration: movieDto.duration,
        };
    }

    static queryParamsDtoToDomain(
        params: GetMoviesQueryParamsDto,
    ): GetMoviesQueryParams {
        return {
            match: params.match,
        };
    }
}
