import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      //Dto에 전달된 값의 유효성검사를 돕기 위해 필요함.
      transform: true, //컨트롤러에서 유저의 입력값을 Dto객체로 변환해주라
    }),
  );

  app.use(cookieParser());

  const config = new DocumentBuilder()
    .setTitle('Sparta Node.js TS')
    .setDescription('Document for Sparta Node.js TS')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
