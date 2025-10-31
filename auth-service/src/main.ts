import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { createRabbitMQOptions } from './config/rabbitmq.config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AuthModule, {
    transport: createRabbitMQOptions(new ConfigService(), 'auth_queue').transport,
    options: createRabbitMQOptions(new ConfigService(), 'auth_queue').options,
  });

  await app.listen();
  console.log('Auth microservice is listening...');
}

bootstrap();
