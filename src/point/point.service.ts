import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Point } from './entities/point.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PointService {
  constructor(
    @InjectRepository(Point)
    private pointRepository: Repository<Point>,
  ) {}

  //포인트 생성(회원가입에서 쓰임)
  async createUserPoint(userId: number) {
    await this.pointRepository.save({
      userId: +userId,
    });
  }

  //예매시 포인트 차감(예매할때쓰임)
  async subtractPoint(userId: number, price: number) {
    const userPoint = await this.pointRepository.findOneBy({ userId });
    await this.pointRepository.update(userId, {
      point: userPoint.point - price,
    });
  }

  //포인트 조회(마이페이지 조회에서)
  async getMyPoint(userId: number) {
    const pointInfo = await this.pointRepository.findOneBy({ userId });
    return pointInfo.point;
  }
}
