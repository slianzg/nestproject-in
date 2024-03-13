import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { LoginDto } from './dto/log-in.dto';
import _ from 'lodash';
import { PointService } from 'src/point/point.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly pointService: PointService,
  ) {}

  //회원가입
  async register(createUserDto: CreateUserDto) {
    const user = createUserDto;
    const existingEmail = await this.findByEmail(user.email);
    if (existingEmail) {
      throw new ConflictException(
        '이미 해당 이메일로 가입한 사용자가 있습니다.',
      );
    }
    const existingNickname = await this.findByNickname(user.nickname);
    if (existingNickname) {
      throw new ConflictException(
        '이미 해당 닉네임으로 가입한 사용자가 있습니다.',
      );
    }
    const hashedPassword = await hash(user.password, 10); //암호화
    await this.userRepository.save({
      email: user.email,
      password: hashedPassword,
      name: user.name,
      nickname: user.nickname,
      role: user.role,
    });

    const registerdUser = await this.userRepository.findOneBy({
      email: user.email,
    });

    await this.pointService.createUserPoint(registerdUser.userId);
  }

  //로그인
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({
      select: ['userId', 'email', 'password'],
      where: { email },
    });
    if (_.isNil(user)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }

    if (!(await compare(password, user.password))) {
      //해쉬된 비밀번호랑 비교해서 다르면!
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }

    const payload = { email, userId: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  //이메일로 user찾기
  async findByEmail(email: string) {
    //이 함수는 jwt전략에서 쓰임
    return await this.userRepository.findOneBy({ email });
  }

  //닉네임으로 user찾기
  async findByNickname(nickname: string) {
    return await this.userRepository.findOneBy({ nickname });
  }

  //내 정보 볼 때 포인트가져오기
  async getUserPoint(userId: number) {
    return await this.pointService.getMyPoint(userId);
  }
}
