import { Controller, Get, Post, Body, UseGuards, Res } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/log-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { UserInfo } from 'src/utils/userInfo.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  //회원가입
  @Post('register')
  async resister(@Body() createUserDto: CreateUserDto, @Res() res) {
    await this.userService.register(createUserDto);
    res.send('회원가입되었습니다. 로그인해주세요!');
  }

  //로그인
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const token = await this.userService.login(loginDto);
    res.cookie('authorization', `Bearer ${token.access_token}`);
    res.send('로그인되었습니다.');
  }

  //(로그인시)내 정보 확인
  @UseGuards(AuthGuard('jwt'))
  @Get('mypage')
  async getUserInfo(@UserInfo() user: User) {
    return { user };
  }
}
