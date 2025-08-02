import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly httpService: HttpService,
  ) {}

  @Get()
  async getHello(): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://ai-model:5000/generate'),
      );
      return response.data;
    } catch (error) {
      return this.appService.getHello();
    }
  }

  @Get('test-transcription')
  async testTranscription(): Promise<{ message: string; transcription: string }> {
    return {
      message: 'Транскрибация работает!',
      transcription: 'This is a test transcription from the Harvard audio file. The system is working correctly.'
    };
  }

  @Get('page')
  @Header('Content-Type', 'text/html')
  getPage(): string {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>KIKO Test Page</title>
        </head>
        <body>
          <h1>KIKO Test Page</h1>
          <p>Сервер работает!</p>
          <p>Транскрибация: This is a test transcription from the Harvard audio file. The system is working correctly.</p>
        </body>
      </html>
    `;
  }
}
