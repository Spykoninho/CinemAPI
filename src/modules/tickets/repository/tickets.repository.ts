import { DataSource, MoreThan } from 'typeorm';
import { TicketsRepository } from '../domain/tickets.abstract.repository';
import { TicketEntity } from 'src/core/entities/ticket.entity';
import { RequestTicketDto } from '../controllers/dto/tickets.dto';

export class TicketsRepositoryImplementation implements TicketsRepository {
    constructor(private readonly dataSource: DataSource) {}

    async getTicketsByUserId(
        userId: number,
        limit: number,
        offset: number,
    ): Promise<[TicketEntity[], number]> {
        const [tickets, count] = await this.dataSource
            .getRepository(TicketEntity)
            .findAndCount({
                where: {
                    userId: userId,
                },
                skip: offset,
                take: limit,
                order: {
                    purchaseDate: 'DESC',
                },
            });
        return [tickets, count];
    }

    async findActiveSuperTicket(): Promise<TicketEntity | null> {
        return await this.dataSource.getRepository(TicketEntity).findOne({
            where: {
                isSuperTicket: true,
                remainingSessions: MoreThan(0),
            },
        });
    }

    async updateTicket(ticket: TicketEntity): Promise<TicketEntity> {
        return await this.dataSource.getRepository(TicketEntity).save(ticket);
    }

    async buyTicket(
        ticket: RequestTicketDto,
        userId: number,
    ): Promise<TicketEntity> {
        const preparedTicket = this.dataSource
            .getRepository(TicketEntity)
            .create({
                sessionId: ticket.sessionId ? ticket.sessionId : undefined,
                userId: userId,
                purchaseDate: new Date(),
                isSuperTicket: ticket.isSuperTicket,
                remainingSessions: ticket.isSuperTicket ? 10 : 0,
            });
        const ticketBought = await this.dataSource
            .getRepository(TicketEntity)
            .save(preparedTicket);
        return ticketBought;
    }
}
