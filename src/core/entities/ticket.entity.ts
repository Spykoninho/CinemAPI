import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsISO8601, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tickets' })
export class TicketEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true, default: null })
    @IsString()
    @Optional()
    sessionId: number;

    @Column()
    @IsString()
    userId: number;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    @IsISO8601()
    purchaseDate: Date;

    @Column()
    @IsBoolean()
    isSuperTicket: boolean;

    @Column({ nullable: true, default: null })
    @IsInt()
    @Type(() => Number)
    @Optional()
    remainingSessions: number;
}
