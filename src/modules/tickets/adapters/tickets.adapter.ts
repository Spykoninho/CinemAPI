import { TicketEntity } from 'src/core/entities/ticket.entity';
import { Ticket } from '../domain/ticket.model';
import { ResponseTicketDto } from '../controllers/dto/tickets.dto';

export class TicketsAdapter {
    static domainToEntity(ticket: Ticket): TicketEntity {
        return {
            id: ticket.id,
            sessionId: ticket.sessionId,
            userId: ticket.userId,
            purchaseDate: ticket.purchaseDate,
            isSuperTicket: ticket.isSuperTicket,
            remainingSessions: ticket.remainingSessions,
        };
    }

    static entityToDomain(ticketEntity: TicketEntity): Ticket {
        return {
            id: ticketEntity.id,
            sessionId: ticketEntity.sessionId,
            userId: ticketEntity.userId,
            purchaseDate: ticketEntity.purchaseDate,
            isSuperTicket: ticketEntity.isSuperTicket,
            remainingSessions: ticketEntity.remainingSessions,
        };
    }

    static listEntityToDomain(ticketEntities: TicketEntity[]): Ticket[] {
        return ticketEntities.map((ticketEntity) =>
            this.entityToDomain(ticketEntity),
        );
    }

    static domainToResponseTicketDto(ticket: Ticket): ResponseTicketDto {
        return {
            id: ticket.id,
            sessionId: ticket.sessionId,
            userId: ticket.userId,
            purchaseDate: ticket.purchaseDate,
            isSuperTicket: ticket.isSuperTicket,
            remainingSessions: ticket.remainingSessions,
        };
    }

    static domainToResponseTicketDtoList(
        tickets: Ticket[],
    ): ResponseTicketDto[] {
        return tickets.map((ticket) => this.domainToResponseTicketDto(ticket));
    }
}
