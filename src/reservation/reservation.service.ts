import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from './entities/reservation.entity';
import { Repository } from 'typeorm';
import { PointService } from 'src/point/point.service';
import { ShowService } from 'src/show/show.service';

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(Reservation)
    private reservationRepository: Repository<Reservation>,
    private readonly pointService: PointService,
    private readonly showService: ShowService,
  ) {}

  //예약 생성
  async createReservation(showId: number, userId: number) {
    const showInfo = await this.showService.findOne(showId);
    if (showInfo.available === '현재 예매 불가능합니다') {
      throw new NotAcceptableException('이 공연은 더이상 예매할 수 없습니다.');
    }

    const userPoint = await this.pointService.getMyPoint(userId);
    const price = showInfo.showInfo.price;
    if (userPoint < price) {
      throw new NotAcceptableException('포인트 잔액이 부족합니다.');
    }

    await this.reservationRepository.save({
      showId,
      userId,
    }); //예약 생성

    await this.pointService.subtractPoint(userId, price); //포인트 차감

    return {
      result: '정상적으로 예매되었습니다.',
      showInfo: showInfo.showInfo,
    };
  }

  //나의 예약목록 조회
  async getMyReservations(userId: number) {
    return await this.reservationRepository.find({
      where: { userId },
      relations: { show: true },
      order: { reservationDate: 'DESC' },
    });
  }
}
