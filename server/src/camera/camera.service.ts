import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as ffmpeg from 'fluent-ffmpeg';
import { WhisperService } from '../whisper/whisper.service';

@Injectable()
export class CameraService {
  private readonly logger = new Logger(CameraService.name);
  private isMicrophoneEnabled = false;

  constructor(
    private readonly httpService: HttpService,
    private readonly whisperService: WhisperService,
  ) {}

  async enableMicrophone(cameraIp: string, credentials: string): Promise<void> {
    try {
      const auth = Buffer.from(credentials).toString('base64');
      
      // Включение микрофона через API камеры
      await firstValueFrom(
        this.httpService.post(
          `http://${cameraIp}/cgi-bin/audio.cgi?action=start`,
          {},
          { headers: { Authorization: `Basic ${auth}` } },
        ),
      );

      this.isMicrophoneEnabled = true;
      this.logger.log('Микрофон включен');

      // Запуск обработки аудиопотока
      this.processAudioStream(cameraIp, credentials);
    } catch (error) {
      this.logger.error('Ошибка включения микрофона', error);
      throw error;
    }
  }

  async disableMicrophone(cameraIp: string, credentials: string): Promise<void> {
    try {
      const auth = Buffer.from(credentials).toString('base64');
      
      await firstValueFrom(
        this.httpService.post(
          `http://${cameraIp}/cgi-bin/audio.cgi?action=stop`,
          {},
          { headers: { Authorization: `Basic ${auth}` } },
        ),
      );

      this.isMicrophoneEnabled = false;
      this.logger.log('Микрофон выключен');
    } catch (error) {
      this.logger.error('Ошибка выключения микрофона', error);
      throw error;
    }
  }

  async getMicrophoneStatus(cameraIp: string, credentials: string): Promise<any> {
    const auth = Buffer.from(credentials).toString('base64');
    const response = await firstValueFrom(
      this.httpService.get(
        `http://${cameraIp}/cgi-bin/configManager.cgi?action=getConfig&name=AudioEncode`,
        { headers: { Authorization: `Basic ${auth}` } },
      ),
    );
    return response.data;
  }

  private processAudioStream(cameraIp: string, credentials: string): void {
    const auth = Buffer.from(credentials).toString('base64');
    const rtspUrl = `rtsp://${credentials.split(':')[0]}:${credentials.split(':')[1]}@${cameraIp}/stream=1`;

    ffmpeg()
      .input(rtspUrl)
      .inputOptions([
        '-rtsp_transport tcp',
        '-timeout 5000000',
        '-re',
      ])
      .audioCodec('pcm_s16le')
      .audioChannels(1)
      .audioFrequency(16000)
      .format('s16le')
      .on('error', (err) => {
        this.logger.error('Ошибка обработки аудиопотока', err);
      })
      .pipe()
      .on('data', async (chunk) => {
        try {
          const transcription = await this.whisperService.transcribe(chunk);
          this.logger.log(`Транскрипция: ${transcription}`);
        } catch (error) {
          this.logger.error('Ошибка транскрипции', error);
        }
      });
  }
}