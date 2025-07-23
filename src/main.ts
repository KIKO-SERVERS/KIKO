import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { createLoggerConfig } from './logger/logger.config';

async function bootstrap() {
  const logger = WinstonModule.createLogger(createLoggerConfig());
  const app = await NestFactory.create(AppModule, {
    logger,
  });
  await app.listen(3000);
}
bootstrap();
