import { Controller, Get } from '@nestjs/common';
import axios from 'axios';
import { readFileSync } from 'fs';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/page')
  async getPage() {
    const mapDir = join(__dirname, '../../static/pages/test-page.html');
    return readFileSync(mapDir, 'utf8');
  }

  @Get()
  async getHello() {
    const response = await axios.post('http://ai-model:5000/generate', {
      inputs: 'Your prompt here',
      parameters: {
        max_new_tokens: 200,
      },
    });
  }
}
