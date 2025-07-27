import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpeechModule } from './speech/speech.module';
import { LoggerModule } from './logger/logger.module';
import { AiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    SpeechModule, 
    LoggerModule],
  controllers: [AppController, AiController],
  providers: [AppService],
})
export class AppModule {}
