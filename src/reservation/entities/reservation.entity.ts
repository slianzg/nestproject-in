import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'reservations',
})
export class Reservation {
  @PrimaryGeneratedColumn()
  reservationId: number;

  @ManyToOne(() => Show, (show) => show.reservation)
  @JoinColumn({ name: 'showId', referencedColumnName: 'showId' })
  show: Show;

  @Column({ type: 'int', name: 'showId' })
  showId: number;

  @ManyToOne(() => User, (user) => user.reservation)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @Column({ type: 'int', name: 'userId' })
  userId: number;

  @CreateDateColumn({ name: 'reservationDate' })
  reservationDate: Date;
}
