import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Search,
  Query,
} from '@nestjs/common';
import { ShowService } from './show.service';
import { CreateShowDto } from './dto/create-show.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/type/userRole.type';
import { User } from 'src/user/entities/user.entity';
import { UserInfo } from 'src/utils/userInfo.decorator';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  //공연등록
  @UseGuards(RolesGuard)
  @Roles(Role.Admin)
  @Post('register')
  async registerShow(
    @Body() createShowDto: CreateShowDto,
    @UserInfo() user: User,
  ) {
    const userId = user.userId;
    return await this.showService.create(createShowDto, userId);
  }

  //공연 검색(필터링)
  @Get('search')
  async getFilterdShowList(@Query('title') title: string) {
    return await this.showService.findMany(title);
  }

  //공연 목록 조회(전체조회/공연명별로 나눠서 조회)
  @Get('showList')
  async getShowList() {
    return await this.showService.findAll();
  }

  //공연 상세 조회(공연정보와, 현재 예매 가능한지 여부를 반환)
  @Get(':showId') //path params로 받는 경우 웬만하면 가장 아래에 놓기
  async getShowDetail(@Param('showId') showId: number) {
    return await this.showService.findOne(showId);
  }
}
