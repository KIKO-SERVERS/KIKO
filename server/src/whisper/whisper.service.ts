import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WhisperService {
  private readonly logger = new Logger(WhisperService.name);

  constructor(private readonly httpService: HttpService) {}

  async transcribe(audioData: Buffer): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://ai-model:5000/generate', {
          audio_data: audioData.toString('base64'),
        }),
      );
      return response.data.text;
    } catch (error) {
      this.logger.error('Ошибка транскрипции через Whisper', error);
      throw error;
    }
  }
}
