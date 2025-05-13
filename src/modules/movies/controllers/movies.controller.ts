import {
    Body,
    Controller,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Delete,
    Query,
    UseInterceptors,
    UseGuards,
} from '@nestjs/common';
import { MoviesService } from '../services/movies.service';
import {
    GetMovieDto,
    MovieDto,
    CreateMovieDto,
    UpdateMovieDto,
    GetMoviesQueryParamsDto,
} from './dto/movies.dto';
import {
    ApiBearerAuth,
    ApiNoContentResponse,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { ErrorResponse } from '../../../middlewares/exception.model';
import { MoviesAdapter } from '../adapters/movies.adapter';
import { Paginated, Paging } from '../../../core/pagination/pagination';
import { PaginationInterceptor } from '../../../core/pagination/pagination.interceptor';
import { IsLoginGuard } from '../../../middlewares/is-login.middleware';
import { IsAdminGuard } from '../../../middlewares/is-admin.middleware';

@ApiTags('Movies')
@Controller('movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    @Get()
    @UseInterceptors(PaginationInterceptor)
    @ApiOperation({ summary: 'Get all movies' })
    @ApiOkResponse({ description: 'Movies found', type: [MovieDto] })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    async getMovies(
        @Query() params: GetMoviesQueryParamsDto,
        @Query() pagination: Paging,
    ): Promise<Paginated<MovieDto>> {
        const filters = MoviesAdapter.queryParamsDtoToDomain(params);
        const { movies, count } = await this.moviesService.getMovies(
            filters,
            pagination.page,
            pagination.limit,
        );

        return new Paginated(
            movies.map((movie) => MoviesAdapter.domainToDto(movie)),
            pagination,
            count,
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get movie by id' })
    @ApiOkResponse({ description: 'Movie found', type: MovieDto })
    @ApiNotFoundResponse({
        description: 'Movie not found',
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    async getMovieById(@Param() params: GetMovieDto) {
        const movie = await this.moviesService.getMovieById(params.id);
        return MoviesAdapter.domainToDto(movie);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new movie' })
    @ApiOkResponse({ description: 'Movie created', type: MovieDto })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard, IsAdminGuard)
    async createMovie(@Body() body: CreateMovieDto) {
        const movie = await this.moviesService.createMovie(body);
        return MoviesAdapter.domainToDto(movie);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a movie' })
    @ApiOkResponse({ description: 'Movie updated', type: MovieDto })
    @ApiNotFoundResponse({
        description: 'Movie not found',
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard, IsAdminGuard)
    async updateMovie(
        @Param() params: GetMovieDto,
        @Body() body: UpdateMovieDto,
    ) {
        await this.moviesService.updateMovie(params.id, body);
        return {
            success: true,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a movie' })
    @ApiNoContentResponse({ description: 'Movie successfully deleted' })
    @ApiNotFoundResponse({
        description: 'Movie not found',
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard, IsAdminGuard)
    async deleteMovie(@Param() params: GetMovieDto): Promise<void> {
        await this.moviesService.deleteMovie(params.id);
    }
}
