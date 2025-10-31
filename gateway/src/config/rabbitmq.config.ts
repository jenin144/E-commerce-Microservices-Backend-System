import { ConfigService } from '@nestjs/config';
import { Transport, ClientOptions } from '@nestjs/microservices';

export const createRabbitMQOptions = (
  config: ConfigService,
  queue: string,
): ClientOptions => {
  const rmqUrl = config.get<string>('RABBITMQ_URL') || 'amqp://localhost:5672';

  return {
    transport: Transport.RMQ,
    options: {
      urls: [rmqUrl],
      queue,
      queueOptions: {
        durable: true, 
      },
      noAck: true,
    },
  };
};
