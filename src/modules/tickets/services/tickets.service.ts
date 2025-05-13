import { Injectable } from '@nestjs/common';
import { TicketsRepository } from '../domain/tickets.abstract.repository';
import { TicketsAdapter } from '../adapters/tickets.adapter';
import { Ticket } from '../domain/ticket.model';
import { TicketEntity } from 'src/core/entities/ticket.entity';
import { RequestTicketDto } from '../controllers/dto/tickets.dto';
import { UsersRepository } from 'src/modules/users/domain/users.abstract.repository';
import { isNotNull, isNull } from 'src/utils/tools';
import { CineError } from 'src/utils/CineError';
import { TransactionsService } from '../../transactions/services/transactions.service';
import { TransactionType } from '../../transactions/domain/transaction-type.enum';
import { SessionsService } from '../../sessions/services/sessions.service';

@Injectable()
export class TicketsService {
    TICKET_PRICE = 10;
    constructor(
        private readonly ticketsRepository: TicketsRepository,
        private readonly usersRepository: UsersRepository,
        private readonly transactionsService: TransactionsService,
        private readonly sessionsService: SessionsService,
    ) {}

    async getTickets(
        email: string,
        page: number,
        limit: number,
    ): Promise<[Ticket[], number]> {
        const user = await this.usersRepository.findByEmail(email);
        if (isNull(user)) {
            throw new CineError('user-error', 'User not found', 404);
        }
        const offset = page * limit - limit;
        const [tickets, count] =
            await this.ticketsRepository.getTicketsByUserId(
                user.id,
                limit,
                offset,
            );
        let ticketsList: Ticket[] = [];

        ticketsList = TicketsAdapter.listEntityToDomain(tickets);

        return [ticketsList, count];
    }

    async buyTicket(ticket: RequestTicketDto, email: string): Promise<Ticket> {
        if (isNull(ticket.sessionId) && ticket.isSuperTicket == false) {
            throw new CineError('session-error', 'Session id is required', 400);
        }

        const price = ticket.isSuperTicket
            ? this.TICKET_PRICE * 10
            : this.TICKET_PRICE;

        const user = await this.usersRepository.findByEmail(email);
        if (isNull(user)) {
            throw new CineError('user-error', 'User not found', 404);
        }
        // TODO : Verifier la session si il reste des places, la date...

        if (isNotNull(ticket.sessionId)) {
            const seats = await this.sessionsService.getRemainingSeats(
                ticket.sessionId,
            );
            if (seats < 1) {
                throw new CineError(
                    'session-error',
                    'No more seats available',
                    400,
                );
            }
            const session = await this.sessionsService.getSession(
                ticket.sessionId,
            );

            if (new Date(session?.startSession) < new Date()) {
                throw new CineError(
                    'session-error',
                    'Session already started',
                    400,
                );
            }
        }

        let ticketBought: TicketEntity;
        if (isNotNull(ticket.sessionId) && ticket.isSuperTicket) {
            const superTicket =
                await this.ticketsRepository.findActiveSuperTicket();
            if (isNull(superTicket)) {
                throw new CineError(
                    'super-ticket-error',
                    'No super ticket available',
                    400,
                );
            }

            superTicket.remainingSessions -= 1;
            await this.ticketsRepository.updateTicket(superTicket);
            ticket.isSuperTicket = false;
            ticketBought = await this.ticketsRepository.buyTicket(
                ticket,
                user.id,
            );
        } else {
            if (user.money < price) {
                throw new CineError('money-error', 'Not enough money', 400);
            }

            ticketBought = await this.ticketsRepository.buyTicket(
                ticket,
                user.id,
            );

            await this.transactionsService.saveTransaction(
                price,
                user.id,
                TransactionType.TICKET,
            );

            await this.usersRepository.updateMoney(user.id, user.money - price);
        }
        return TicketsAdapter.entityToDomain(ticketBought);
    }
}
