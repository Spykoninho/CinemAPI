import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity({ name: 'sessions' })
export class SessionsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'timestamptz' })
    start_session: string;

    @Column({ type: 'timestamptz' })
    end_session: string;

    @Column()
    id_movie: number;

    @Column()
    id_room: number;

    @ManyToOne(() => MovieEntity, (movie) => movie.sessions)
    movie: MovieEntity;
}
