import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ShowModule } from './show/show.module';
import { ReservationModule } from './reservation/reservation.module';
import { PointModule } from './point/point.module';
import Joi from 'joi';
import { User } from './user/entities/user.entity';
import { Show } from './show/entities/show.entity';
import { Reservation } from './reservation/entities/reservation.entity';
import { Point } from './point/entities/point.entity';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [User, Show, Reservation, Point],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService], //ConfigService를 의존성주입
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, //이 설정을 전역적으로 적용하겠다!
      validationSchema: Joi.object({
        //여기서 지정한 스키마대로 .env가 정의되어있지 않으면 서버가 동작X
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    ShowModule,
    ReservationModule,
    PointModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
