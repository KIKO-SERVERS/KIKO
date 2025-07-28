import express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WinstonModule } from 'nest-winston';
import { createLoggerConfig } from './logger/logger.config';

async function bootstrap() {
  const logger = WinstonModule.createLogger(createLoggerConfig());
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  app.use('/static', express.static('/app/static'));

  await app.listen(3000);
}
bootstrap();
