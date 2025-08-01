import { Module } from '@nestjs/common';
import { TranscriptionService } from './transcription.service';
import { WhisperService } from './whisper/whisper.service';
import { CameraModule } from '../camera/camera.module';

@Module({
  imports: [CameraModule],
  providers: [TranscriptionService, WhisperService],
  exports: [TranscriptionService],
})
export class TranscriptionModule {}
