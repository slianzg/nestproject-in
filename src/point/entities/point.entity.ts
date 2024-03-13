import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'points',
})
export class Point {
  @PrimaryGeneratedColumn()
  pointId: number;

  @OneToOne(() => User, (user) => user.point, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'int', name: 'userId' })
  userId: number;

  @Column({ type: 'int', nullable: false, default: 1000000 })
  point: number;
}
