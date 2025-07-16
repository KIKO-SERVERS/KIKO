import { Controller, Get } from '@nestjs/common'
import { AppService } from './app.service'
imprt axios from 'axios'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello(){
    const response = await axios.post('http://ai-model:5000/generate', {
  inputs: 'Your prompt here',
  parameters: {
    max_new_tokens: 200
  }
});
  }
}
