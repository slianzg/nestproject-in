import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { Category } from '../type/showCategory.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateShowDto {
  @IsString()
  @MinLength(1)
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  @ApiProperty({ example: 'H.E.R', description: '공연 제목' })
  title: string;

  @IsUrl()
  @IsOptional()
  @ApiProperty({
    example:
      'https://cdnticket.melon.co.kr/resource/image/upload/product/2024/01/2024012215414318c825b7-b889-4ffe-affb-e4f05d9b1886.jpg/melon/resize/180x254/strip/true/quality/90/optimize',
    description: '공연 이미지',
  })
  showImage: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty({ message: '공연자를 입력해주세요.' })
  @ApiProperty({ example: 'IU', description: '공연자' })
  artists: string;

  @IsString()
  @MinLength(1)
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  @ApiProperty({ example: '올림픽 체조 경기장', description: '공연 장소' })
  location: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '아이유 콘서트', description: '공연 설명' })
  description: string;

  @IsInt()
  @Min(0)
  @Max(50000)
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  @ApiProperty({ example: 50000, description: '공연 가격' })
  price: number;

  @IsDateString()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  @ApiProperty({ example: '2024-03-10', description: '공연 날짜' })
  showDate: Date; //"2024-03-14"이렇게 입력해야 함

  @IsEnum(Category)
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  @ApiProperty({ example: 'concert', description: '공연 카테고리' })
  category: Category;

  @IsInt()
  @Min(0)
  @IsNotEmpty({ message: '공연장 좌석수를 입력해주세요' })
  @ApiProperty({ example: 15000, description: '좌석수' })
  seat: number;
}
