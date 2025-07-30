import { Module } from '@nestjs/common';
import { CameraService } from './camera.service';
import { CameraController } from './camera.controller';
import { HttpModule } from '@nestjs/axios';
import { WhisperService } from '../whisper/whisper.service';

@Module({
  imports: [HttpModule],
  providers: [CameraService, WhisperService],
  controllers: [CameraController],
  exports: [CameraService],
})
export class CameraModule {}
