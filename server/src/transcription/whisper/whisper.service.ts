import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class WhisperService {
  private readonly logger = new Logger(WhisperService.name);

  async transcribe(
    audioPath: string,
    callback: (text: string) => void,
  ): Promise<void> {
    this.logger.log(`Starting transcription of file: ${audioPath}`);

    try {
      // Заглушка для тестирования - возвращаем тестовый текст
      const testText = "This is a test transcription from the Harvard audio file. The system is working correctly.";
      
      this.logger.log(`Test transcription result: ${testText}`);
      callback(testText);
    } catch (error) {
      this.logger.error(`Whisper transcription error: ${error.message}`);
      callback('');
    }
  }
}
