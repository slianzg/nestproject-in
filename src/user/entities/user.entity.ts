import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../type/userRole.type';
import { Point } from 'src/point/entities/point.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';
import { Show } from 'src/show/entities/show.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  password: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  nickname: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @OneToOne(() => Point, (point) => point.user)
  point: Point;

  @OneToMany(() => Show, (show) => show.user)
  show: Show[];

  @OneToMany(() => Reservation, (reservation) => reservation.user)
  reservation: Reservation[];
}
