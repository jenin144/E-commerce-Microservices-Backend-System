
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createRabbitMQOptions } from '../config/rabbitmq.config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'PRODUCTS_SERVICE',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) =>
          createRabbitMQOptions(configService, 'products_queue'),
      },
    ]),
  ],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}