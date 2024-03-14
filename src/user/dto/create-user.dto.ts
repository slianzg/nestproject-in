import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../type/userRole.type';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요' })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  password: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty({ message: '닉네임을 입력해주세요' })
  nickname: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty({ message: '이름을 입력해주세요' })
  name: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
