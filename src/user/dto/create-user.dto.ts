import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Role } from '../type/userRole.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요' })
  @ApiProperty({ example: 'aaaa1234@gmail.com', description: '이메일' })
  email: string;

  @IsString()
  @MinLength(6)
  @IsNotEmpty({ message: '비밀번호를 입력해주세요' })
  @ApiProperty({ example: 'aaaa1234', description: '비밀번호' })
  password: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty({ message: '닉네임을 입력해주세요' })
  @ApiProperty({ example: '곰', description: '닉네임' })
  nickname: string;

  @IsString()
  @MinLength(2)
  @IsNotEmpty({ message: '이름을 입력해주세요' })
  @ApiProperty({ example: '김민지', description: '이름' })
  name: string;

  @IsEnum(Role)
  @IsOptional()
  @ApiProperty({ example: 0, description: '유저등급' })
  role: Role;
}
