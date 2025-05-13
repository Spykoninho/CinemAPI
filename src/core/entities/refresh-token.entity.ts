import { IsInt, IsISO8601, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'refresh_tokens' })
export class RefreshTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsInt()
    userId: number;

    @Column({ unique: true })
    @IsString()
    token: string;

    @Column()
    @IsISO8601()
    expirationDate: Date;
}
