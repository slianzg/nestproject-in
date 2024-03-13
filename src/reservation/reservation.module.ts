import { Module } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { PointModule } from 'src/point/point.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { ShowModule } from 'src/show/show.module';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation]), PointModule, ShowModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
