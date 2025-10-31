import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { createRabbitMQOptions } from './config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const configService = new ConfigService();
  const rmqOptions = createRabbitMQOptions(configService, 'users_queue');

  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: rmqOptions.transport,
    options: rmqOptions.options,
  });

  await app.listen();
  console.log('Users microservice is listening...');
}

bootstrap();
