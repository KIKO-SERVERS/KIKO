import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CameraService } from './camera.service';

@Controller('camera')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Post('audio/enable')
  async enableMicrophone(
    @Body('cameraIp') cameraIp: string,
    @Body('credentials') credentials: string,
  ) {
    await this.cameraService.enableMicrophone(cameraIp, credentials);
    return { status: 'Microphone enabled' };
  }

  @Post('audio/disable')
  async disableMicrophone(
    @Body('cameraIp') cameraIp: string,
    @Body('credentials') credentials: string,
  ) {
    await this.cameraService.disableMicrophone(cameraIp, credentials);
    return { status: 'Microphone disabled' };
  }

  @Get('audio/status')
  async getMicrophoneStatus(
    @Query('cameraIp') cameraIp: string,
    @Query('credentials') credentials: string,
  ) {
    return this.cameraService.getMicrophoneStatus(cameraIp, credentials);
  }

  @Get('audio/stream')
  async getAudioStream(
    @Query('cameraIp') cameraIp: string,
    @Query('credentials') credentials: string,
  ) {
    return this.cameraService.getAudioStream(cameraIp, credentials);
  }

  @Post('audio/process')
  async processAudio(
    @Body('cameraIp') cameraIp: string,
    @Body('credentials') credentials: string,
  ) {
    await this.cameraService.processAudio(cameraIp, credentials);
    return { status: 'Audio processing started' };
  }
}
