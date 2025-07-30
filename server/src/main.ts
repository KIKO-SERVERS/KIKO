import express from 'express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { createLoggerConfig } from './logger/logger.config';
import { TranscriptionService } from './transcription/transcription.service';

async function bootstrap() {
  const logger = WinstonModule.createLogger(createLoggerConfig());
  const app = await NestFactory.create(AppModule, {
    logger,
  });

  // Start transcription automatically
  const transcriptionService = app.get(TranscriptionService);
  await transcriptionService.startTranscription()
    .catch(err => logger.error('Failed to start transcription', err));

  app.use('/static', express.static('/app/static'));
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));

  await app.listen(3000);
  logger.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
