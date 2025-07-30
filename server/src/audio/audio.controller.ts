import { Controller, Get, Post } from '@nestjs/common';
import { AudioService } from './audio.service';
import { AudioStatus, AudioStream } from './interfaces/audio.interface';

@Controller('audio')
export class AudioController {
  constructor(private readonly audioService: AudioService) {}

  @Get('stream')
  async getAudioStream(): Promise<AudioStream> {
    return this.audioService.getAudioStream();
  }

  @Post('enable')
  async enableMicrophone(): Promise<AudioStatus> {
    return this.audioService.enableMicrophone();
  }

  @Post('disable')
  async disableMicrophone(): Promise<AudioStatus> {
    return this.audioService.disableMicrophone();
  }

  @Get('status')
  async getMicrophoneStatus(): Promise<AudioStatus> {
    return this.audioService.getStatus();
  }
}
