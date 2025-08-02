import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { SpeechModule } from './speech/speech.module';
import { LoggerModule } from './logger/logger.module';
import { AiController } from './ai.controller';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import configuration from './config/configuration';
import { TranscriptionModule } from './transcription/transcription.module';
import { CameraModule } from './camera/camera.module';
import { AudioModule } from './audio/audio.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    HttpModule,
    // SpeechModule,
    LoggerModule,
    TranscriptionModule,
    CameraModule,
    AudioModule,
  ],
  controllers: [AppController, AiController],
  providers: [AppService],
})
export class AppModule {}
