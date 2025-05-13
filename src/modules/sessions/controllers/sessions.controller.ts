import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Patch,
    Post,
    Query,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { SessionsService } from '../services/sessions.service';
import {
    ApiBearerAuth,
    ApiNoContentResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { IsLoginGuard } from '../../../middlewares/is-login.middleware';
import { IsAdminGuard } from '../../../middlewares/is-admin.middleware';
import {
    CreateSessionDto,
    GetSessionDto,
    GetSessionHistoryByEmailDto,
    GetSessionsQueryParamsDto,
    SessionsDto,
    UpdateSessionDto,
} from './dto/sessions.dto';
import { SessionsAdapter } from '../adapters/sessions.adapter';
import { Paginated, Paging } from '../../../core/pagination/pagination';
import { PaginationInterceptor } from '../../../core/pagination/pagination.interceptor';
import { RequestWithUser } from '../../../core/interfaces/jwt.interface';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {}

    @Post()
    @ApiOperation({ summary: 'Create a session' })
    @ApiOkResponse({ description: 'Session created', type: CreateSessionDto })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard, IsAdminGuard)
    async createSession(@Body() body: CreateSessionDto) {
        const session = await this.sessionsService.createSession(body);
        return SessionsAdapter.domainToDto(session);
    }

    @Get()
    @ApiOperation({ summary: 'Get all sessions' })
    @ApiOkResponse({
        description: 'Sessions found',
        type: Paginated<SessionsDto>,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    @UseInterceptors(PaginationInterceptor)
    async getSessions(
        @Query() pagination: Paging,
        @Query() params: GetSessionsQueryParamsDto,
    ) {
        const filters = SessionsAdapter.queryParamsDtoToDomain(params);
        const { sessions, count } = await this.sessionsService.getSessions(
            filters,
            pagination.page,
            pagination.limit,
        );

        return new Paginated(
            sessions.map((session) => SessionsAdapter.domainToDto(session)),
            pagination,
            count,
        );
    }

    @Get('/users/me')
    @ApiOperation({ summary: 'Get my sessions' })
    @ApiOkResponse({
        description: 'Sessions found',
        type: Paginated<SessionsDto>,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    @UseInterceptors(PaginationInterceptor)
    async getMySessionsHistory(
        @Query() pagination: Paging,
        @Request() req: RequestWithUser,
    ) {
        const { returnedSessions, count } =
            await this.sessionsService.getSessionsByUserEmail(
                req.user.email,
                pagination.page,
                pagination.limit,
            );

        return new Paginated(returnedSessions, pagination, count);
    }

    @Get('/users/:email')
    @ApiOperation({ summary: 'Get my sessions' })
    @ApiOkResponse({
        description: 'Sessions found',
        type: Paginated<SessionsDto>,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard, IsAdminGuard)
    @UseInterceptors(PaginationInterceptor)
    async getSessionsHistoryByUserEmail(
        @Query() pagination: Paging,
        @Param() params: GetSessionHistoryByEmailDto,
    ) {
        const { returnedSessions, count } =
            await this.sessionsService.getSessionsByUserEmail(
                params.email,
                pagination.page,
                pagination.limit,
            );

        return new Paginated(returnedSessions, pagination, count);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get a session by id' })
    @ApiOkResponse({ description: 'Session found', type: SessionsDto })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    async getSession(@Param() params: GetSessionDto) {
        const session = await this.sessionsService.getSession(params.id);
        return SessionsAdapter.domainToDto(session);
    }

    @Get(':id/remainingSeats')
    @ApiOperation({ summary: 'Get remaining seats for a session' })
    @ApiOkResponse({
        description: 'Remaining seats found',
        type: SessionsDto,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    async getRemainingSeats(@Param() params: GetSessionDto) {
        const count = await this.sessionsService.getRemainingSeats(params.id);
        return {
            count,
        };
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Delete a session' })
    @ApiNoContentResponse({ description: 'Session successfully deleted' })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard, IsAdminGuard)
    async deleteSession(@Query() params: GetSessionDto): Promise<void> {
        await this.sessionsService.deleteSession(params.id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a session' })
    @ApiOkResponse({
        description: 'Session updated',
        example: { success: true },
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard, IsAdminGuard)
    async updateSession(
        @Param() params: GetSessionDto,
        @Body() body: UpdateSessionDto,
    ) {
        await this.sessionsService.updateSession(params.id, body);
        return {
            success: true,
        };
    }
}
