import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';
import { Category } from '../type/showCategory.type';

export class CreateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 제목을 입력해주세요.' })
  title: string;

  @IsUrl()
  @IsOptional()
  showImage: string;

  @IsString()
  @IsNotEmpty({ message: '공연자를 입력해주세요.' })
  artists: string;

  @IsString()
  @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
  location: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsInt()
  @IsNotEmpty({ message: '가격을 입력해주세요.' })
  price: number;

  @IsDateString()
  @IsNotEmpty({ message: '공연 날짜를 입력해주세요.' })
  showDate: Date; //"2024-03-14"이렇게 입력해야 함
  //이거 배열로 받을 수 있어야 한다는데;; 개같이 포기하겠음

  @IsEnum(Category)
  @IsNotEmpty({ message: '공연 카테고리를 입력해주세요.' })
  category: Category;

  @IsInt()
  @IsNotEmpty({ message: '공연장 좌석수를 입력해주세요' })
  seat: number;
}
