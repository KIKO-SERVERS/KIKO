import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { CameraService } from '../camera/camera.service';
import { WhisperService } from '../whisper/whisper.service';

@Module({
  imports: [HttpModule],
  providers: [AudioService, CameraService, WhisperService],
  controllers: [AudioController],
  exports: [AudioService],
})
export class AudioModule {}
