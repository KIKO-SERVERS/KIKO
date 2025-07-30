import { Injectable, Logger } from '@nestjs/common';
import whisper from 'whisper-node';

@Injectable()
export class WhisperService {
  private readonly logger = new Logger(WhisperService.name);

  async transcribe(audioPath: string, callback: (text: string) => void): Promise<void> {
    this.logger.log(`Starting transcription of file: ${audioPath}`);

    try {
      const options = {
        modelName: 'base.en',
      };

      const transcript = await whisper(audioPath, options);

      if (!transcript || !transcript.text) {
        this.logger.warn('Empty or invalid transcription result');
        callback('');
        return;
      }

      this.logger.log(`Transcribed text: ${transcript.text}`);
      callback(transcript.text);
    } catch (error) {
      this.logger.error(`Whisper transcription error: ${error.message}`);
      callback('');
    }
  }
}
