import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { AUTH_SERVICE, DatabsaeModule, LoggerModule } from '@app/common';
import { Product } from './models/product.entity';
import { ProductsRepository } from './products.repository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi'
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  imports: [
    DatabsaeModule,
    DatabsaeModule.forFeature([Product], "productConnection"),
    LoggerModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        HTTP_PORT: Joi.number().required(),

      }),
    }),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [configService.getOrThrow('RABBITMQ_URI')],
            queue: 'auth'
          }
        }),
        inject: [ConfigService]
      }]
    )

  ],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
})
export class ProductsModule { }
