import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RoomType } from '../../modules/rooms/domain/room-type.enum'; // adapte le chemin si besoin
import { RoomImageEntity } from './room-image.entity';

@Entity({ name: 'rooms' })
export class RoomEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    capacity: number;

    @Column({ type: 'enum', enum: RoomType })
    type: RoomType;

    @Column({ default: false })
    handicap_friendly: boolean;

    @Column({ default: false })
    maintenance: boolean;

    @OneToMany(() => RoomImageEntity, (image) => image.room)
    images: RoomImageEntity[];

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}
