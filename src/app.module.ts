import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeechModule } from './speech/speech.module';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [SpeechModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
