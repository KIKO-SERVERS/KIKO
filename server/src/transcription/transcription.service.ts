import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CameraService } from '../camera/camera.service';
import { WhisperService } from './whisper/whisper.service';
import * as fs from 'fs'; 
import { promises as fsPromises } from 'fs';
import * as os from 'os';
import * as path from 'path';

@Injectable()
export class TranscriptionService implements OnModuleInit {
  private readonly logger = new Logger(TranscriptionService.name);

  constructor(
    private cameraService: CameraService,
    private whisperService: WhisperService,
  ) {}

  async onModuleInit() {
    await this.startTranscription();
  }

  async startTranscription(): Promise<void> {
    this.logger.log('Starting audio transcription service');

    try {
      // Для теста — берём тестовый файл из src/testFiles
      const testFile = path.resolve(process.cwd(), 'src', 'testFiles', 'harvard.wav');

      if (!fs.existsSync(testFile)) {
        this.logger.error(`Test audio file not found: ${testFile}`);
        return;
      }

      await this.whisperService.transcribe(testFile, (text) => {
        this.logger.log(`Test file transcription: ${text}`);
      });

      // Если хочешь получать звук с камеры, раскомментируй следующий блок:
      /*
      const stream = await this.cameraService.getAudioVideoStream();
      const audioStream = this.cameraService.extractAudioFromStream(stream);

      const tmpDir = os.tmpdir();
      const tmpFilePath = path.join(tmpDir, `audio_${Date.now()}.wav`);

      await new Promise<void>((resolve, reject) => {
        const writeStream = fs.createWriteStream(tmpFilePath)
          .on('finish', () => {
            this.logger.log(`Audio saved to temp file: ${tmpFilePath}`);
            resolve();
          })
          .on('error', reject);

        audioStream.stream.pipe(writeStream);
      });

      await this.whisperService.transcribe(tmpFilePath, (text) => {
        this.logger.log(`Live transcription: ${text}`);
      });

      await fsPromises.unlink(tmpFilePath);
      */

    } catch (error) {
      this.logger.error(`Failed to start transcription: ${error.stack || error.message || error}`);
    }
  }
}
