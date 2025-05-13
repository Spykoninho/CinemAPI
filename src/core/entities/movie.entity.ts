import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SessionsEntity } from './sessions.entity';

@Entity({ name: 'movies' })
export class MovieEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    duration: number;

    @Column()
    description: string;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    @OneToMany(() => SessionsEntity, (session) => session.movie)
    sessions: SessionsEntity[];
}
