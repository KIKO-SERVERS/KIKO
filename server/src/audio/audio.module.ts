import { Module } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioController } from './audio.controller';
import { CameraService } from '../camera/camera.service';

@Module({
  providers: [AudioService, CameraService],
  controllers: [AudioController],
  exports: [AudioService],
})
export class AudioModule {}
