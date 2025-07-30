import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CameraConfig, Stream } from './interfaces/camera.interface';
import { AudioStream } from '../audio/interfaces/audio.interface';
import path from 'path';
import fs from 'fs';
import { Readable } from 'stream';

@Injectable()
export class CameraService {
  private readonly logger = new Logger(CameraService.name);
  private config: CameraConfig;

  constructor(private configService: ConfigService) {
    this.config = {
      ip: this.configService.get<string>('CAMERA_IP'),
      port: this.configService.get<number>('CAMERA_PORT'),
      username: this.configService.get<string>('CAMERA_USERNAME'),
      password: this.configService.get<string>('CAMERA_PASSWORD'),
      protocol: this.configService.get<'http' | 'https'>('CAMERA_PROTOCOL'),
    };
  }

  async getAudioVideoStream(): Promise<Stream> {
    this.logger.log('Getting audio/video stream from camera');
    // Implement actual stream fetching logic here
    return {
      audio: this.mockAudioStream(),
      video: this.mockVideoStream(),
    };
  }

  async getAudioStream(): Promise<AudioStream> {
    const stream = await this.getAudioVideoStream();
    return this.extractAudioFromStream(stream);
  }

  async stopAudioStream(): Promise<void> {
    this.logger.log('Stopping audio stream');
    // Implement actual stop logic here
  }

  extractAudioFromStream(stream: Stream): AudioStream {
    this.logger.log('Extracting audio from stream');
    return {
      stream: stream.audio,
      format: 'PCM',
      sampleRate: 16000,
    };
  }

  private mockAudioStream(): Readable {
    const testFilePath = path.resolve(process.cwd(), 'src', 'testFiles', 'harvard.wav');
    return fs.createReadStream(testFilePath);
  }

  // private mockVideoStream(): Readable {
  //   const filePath = path.resolve(process.cwd(), 'src', 'testFiles', 'mp4.MP4');
  //   return fs.createReadStream(filePath);
  // }

  private mockVideoStream(): Readable {
    return new Readable({
      read() {
        this.push(null); // сразу завершает поток
      }
    });
  }
}