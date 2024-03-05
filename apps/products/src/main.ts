import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(ProductsModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.useLogger(app.get(Logger))
  app.use(cookieParser());
  const configService = app.get(ConfigService)
  await app.listen(configService.get('HTTP_PORT'));
}
bootstrap();
