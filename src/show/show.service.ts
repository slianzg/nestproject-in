import { Injectable } from '@nestjs/common';
import { CreateShowDto } from './dto/create-show.dto';
import { Show } from './entities/show.entity';
import { Repository, DataSource, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reservation } from 'src/reservation/entities/reservation.entity';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    private dataSource: DataSource,
  ) {}

  //공연 등록
  async create(createShowDto: CreateShowDto, userId: number) {
    const showInfo = createShowDto;
    const show = await this.showRepository.save({
      title: showInfo.title,
      showImage: showInfo.showImage,
      artists: showInfo.artists,
      location: showInfo.location,
      description: showInfo.description,
      price: showInfo.price,
      showDate: showInfo.showDate,
      category: showInfo.category,
      seat: showInfo.seat,
      adminId: +userId,
    });
    return show;
  }

  //공연 목록 조회(전체조회/공연명별로 나눠서 조회)
  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      select: [
        'showId',
        'title',
        'showImage',
        'category',
        'location',
        'showDate',
      ],
      order: { title: 'ASC', showId: 'DESC' },
    });
  }

  //공연 상세 조회
  async findOne(showId: number) {
    const showInfo = await this.showRepository.findOne({
      where: { showId },
    });

    const count = await this.dataSource
      .getRepository(Reservation)
      .createQueryBuilder('reservations')
      .where('reservations.showid = :id', { id: showId })
      .getCount();

    const today = new Date(); //

    const year = today.getFullYear();
    const month = ('0' + (today.getMonth() + 1)).slice(-2);
    const day = ('0' + today.getDate()).slice(-2);

    const dateString = year + '-' + month + '-' + day;

    const todayString = new Date(dateString); //today를 YYYY-MM-DD형태로 가져옴.
    const showDate = new Date(showInfo.showDate); //비교를 위해 둘다 날짜 형식으로 바꿔줌

    const message =
      showInfo.seat > count && showDate > todayString
        ? '현재 예매가능합니다.'
        : '현재 예매 불가능합니다';
    return { showInfo, reservationCount: count, available: message };
  }

  //+공연 검색(필터링)
  async findMany(title: string) {
    return await this.showRepository.find({
      where: { title: Like(`%${title}%`) },
      select: {
        showId: true,
        title: true,
        showImage: true,
        category: true,
        location: true,
        showDate: true,
      },
    });
  }
}
