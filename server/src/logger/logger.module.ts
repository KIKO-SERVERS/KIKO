// src/logger/logger.module.ts
import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';
import { createLoggerConfig } from './logger.config';

@Module({
  imports: [WinstonModule.forRoot(createLoggerConfig())],
  exports: [WinstonModule],
})
export class LoggerModule {}
