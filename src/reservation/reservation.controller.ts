import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('RESERVATION')
@UseGuards(AuthGuard('jwt'))
@Controller('reservation')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @ApiOperation({ summary: '예약 생성' })
  //예약 생성
  @Post(':showId')
  async createReservation(
    @Param('showId') showId: number,
    @UserInfo() user: User,
  ) {
    const { userId } = user;
    return await this.reservationService.createReservation(showId, userId);
  }

  @ApiOperation({ summary: '(로그인사용자 한정)예약 목록 조회' })
  //나의 예약목록 조회
  @Get('reservationList')
  async getMyReservations(@UserInfo() user: User) {
    const { userId } = user;
    return await this.reservationService.getMyReservations(userId);
  }
}
