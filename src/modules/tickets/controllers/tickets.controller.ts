import {
    Body,
    Controller,
    Get,
    Post,
    Query,
    Request,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';
import { TicketsService } from '../services/tickets.service';
import { ErrorResponse } from 'src/middlewares/exception.model';
import { RequestTicketDto, ResponseTicketDto } from './dto/tickets.dto';
import { TicketsAdapter } from '../adapters/tickets.adapter';
import { IsAdminGuard } from 'src/middlewares/is-admin.middleware';
import { IsLoginGuard } from 'src/middlewares/is-login.middleware';
import { PaginationInterceptor } from '../../../core/pagination/pagination.interceptor';
import { Paginated, Paging } from '../../../core/pagination/pagination';
import { RequestWithUser } from '../../../core/interfaces/jwt.interface';

@ApiTags('Tickets')
@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketService: TicketsService) {}

    @Get()
    @UseInterceptors(PaginationInterceptor)
    @ApiOperation({ summary: 'Get my tickets' })
    @ApiOkResponse({ description: 'Tickets found', type: [ResponseTicketDto] })
    @ApiNotFoundResponse({
        description: 'Tickets not found',
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard, IsAdminGuard)
    async getTickets(
        @Request() req: RequestWithUser,
        @Query() pagination: Paging,
    ): Promise<Paginated<ResponseTicketDto>> {
        const [tickets, count] = await this.ticketService.getTickets(
            req.user.email,
            pagination.page,
            pagination.limit,
        );
        const ticketsResponse =
            TicketsAdapter.domainToResponseTicketDtoList(tickets);
        return new Paginated(ticketsResponse, pagination, count);
    }

    @Post()
    @ApiOperation({ summary: 'Buy a ticket' })
    @ApiOkResponse({ description: 'Ticket bought', type: ResponseTicketDto })
    @ApiNotFoundResponse({
        description: 'Ticket not bought',
        type: ErrorResponse,
    })
    @ApiBearerAuth()
    @UseGuards(IsLoginGuard)
    async buyTicket(
        @Body() body: RequestTicketDto,
        @Request() req: RequestWithUser,
    ): Promise<ResponseTicketDto> {
        const ticket = await this.ticketService.buyTicket(body, req.user.email);
        return TicketsAdapter.domainToResponseTicketDto(ticket);
    }
}
