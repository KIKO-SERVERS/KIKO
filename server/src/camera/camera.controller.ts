import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CameraService } from './camera.service';

@Controller('audio')
export class CameraController {
  constructor(private readonly cameraService: CameraService) {}

  @Post('enable')
  async enableMicrophone(
    @Body('cameraIp') cameraIp: string,
    @Body('credentials') credentials: string,
  ) {
    return this.cameraService.enableMicrophone(cameraIp, credentials);
  }

  @Post('disable')
  async disableMicrophone(
    @Body('cameraIp') cameraIp: string,
    @Body('credentials') credentials: string,
  ) {
    return this.cameraService.disableMicrophone(cameraIp, credentials);
  }

  @Get('status')
  async getMicrophoneStatus(
    @Query('cameraIp') cameraIp: string,
    @Query('credentials') credentials: string,
  ) {
    return this.cameraService.getMicrophoneStatus(cameraIp, credentials);
  }
}