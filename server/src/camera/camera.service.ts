import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import ffmpeg from 'fluent-ffmpeg';
import { Readable } from 'stream';
import { WhisperService } from '../whisper/whisper.service';

export interface AudioStream {
  stream: Readable;
  metadata: {
    codec: string;
    sampleRate: number;
    channels: number;
  };
}

@Injectable()
export class CameraService {
  private readonly logger = new Logger(CameraService.name);
  private audioStream: ffmpeg.FfmpegCommand | null = null;
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
    } catch (error) {
      this.logger.error('Ошибка включения микрофона', error);
      throw error;
    }
  }

  async disableMicrophone(
    cameraIp: string,
    credentials: string,
  ): Promise<void> {
    try {
      const auth = Buffer.from(credentials).toString('base64');

      await firstValueFrom(
        this.httpService.post(
          `http://${cameraIp}/cgi-bin/audio.cgi?action=stop`,
          {},
          { headers: { Authorization: `Basic ${auth}` } },
        ),
      );

      await this.stopAudioStream();
      this.isMicrophoneEnabled = false;
      this.logger.log('Микрофон выключен');
    } catch (error) {
      this.logger.error('Ошибка выключения микрофона', error);
      throw error;
    }
  }

  async getMicrophoneStatus(
    cameraIp: string,
    credentials: string,
  ): Promise<any> {
    const auth = Buffer.from(credentials).toString('base64');
    const response = await firstValueFrom(
      this.httpService.get(
        `http://${cameraIp}/cgi-bin/configManager.cgi?action=getConfig&name=Audio`,
        { headers: { Authorization: `Basic ${auth}` } },
      ),
    );
    return response.data;
  }

  async getAudioStream(
    cameraIp: string,
    credentials: string,
  ): Promise<AudioStream> {
    if (!this.isMicrophoneEnabled) {
      throw new Error('Microphone is disabled');
    }

    if (this.audioStream) {
      this.audioStream.kill('SIGTERM');
    }

    const [username, password] = credentials.split(':');
    const rtspUrl = `rtsp://${username}:${password}@${cameraIp}/cam/realmonitor?channel=1&subtype=0&audio=1`;

    this.audioStream = ffmpeg(rtspUrl)
      .inputOptions(['-rtsp_transport tcp', '-re', '-ac 1', '-ar 16000'])
      .audioCodec('pcm_s16le')
      .format('s16le')
      .on('error', (err) => {
        this.logger.error('Audio stream error:', err);
      })
      .on('end', () => this.logger.warn('Audio stream ended'));

    return {
      stream: this.audioStream.pipe() as Readable,
      metadata: {
        codec: 'pcm_s16le',
        sampleRate: 16000,
        channels: 1,
      },
    };
  }

  async stopAudioStream(): Promise<void> {
    if (this.audioStream) {
      this.audioStream.kill('SIGTERM');
      this.audioStream = null;
      this.logger.log('Audio stream stopped');
    }
  }

  async processAudio(cameraIp: string, credentials: string): Promise<void> {
    const { stream } = await this.getAudioStream(cameraIp, credentials);

    stream.on('data', async (chunk: Buffer) => {
      try {
        const transcription = await this.whisperService.transcribe(chunk);
        this.logger.log(`Транскрипция: ${transcription}`);
      } catch (error) {
        this.logger.error('Ошибка транскрипции', error);
      }
    });
  }
}
