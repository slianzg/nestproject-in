import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from '../type/showCategory.type';
import { User } from 'src/user/entities/user.entity';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  showId: number;

  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'varchar', nullable: true })
  showImage?: string;

  @Column({ type: 'varchar', nullable: false })
  artists: string;

  @Column({ type: 'varchar', nullable: false })
  location: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'date', nullable: false })
  showDate: Date; //이거 배열로 받아야한다는데...?

  @Column({ type: 'enum', enum: Category, nullable: false })
  category: Category;

  @Column({ type: 'int', nullable: false })
  seat: number;

  @ManyToOne(() => User, (user) => user.show)
  @JoinColumn({ name: 'adminId' })
  user: User;

  @Column({ type: 'int', name: 'adminId' })
  adminId: number;

  @OneToMany(() => Reservation, (reservation) => reservation.show)
  reservation: Reservation[];
}
