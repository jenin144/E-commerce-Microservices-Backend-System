import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { createRabbitMQOptions } from './config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProductsModule, {
    transport: createRabbitMQOptions(new ConfigService(), 'products_queue').transport,
    options: createRabbitMQOptions(new ConfigService(), 'products_queue').options,
  });

  await app.listen();
  console.log('Products microservice is listening...');
}

bootstrap();
