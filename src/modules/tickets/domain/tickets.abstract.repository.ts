import { TicketEntity } from 'src/core/entities/ticket.entity';
import { RequestTicketDto } from '../controllers/dto/tickets.dto';

export abstract class TicketsRepository {
    abstract getTicketsByUserId(
        userId: number,
        limit: number,
        offset: number,
    ): Promise<[TicketEntity[], number]>;

    abstract buyTicket(
        ticket: RequestTicketDto,
        userId: number,
    ): Promise<TicketEntity>;

    abstract findActiveSuperTicket(): Promise<TicketEntity | null>;

    abstract updateTicket(ticket: TicketEntity): Promise<TicketEntity>;
}
