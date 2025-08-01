import { Controller, Post, Body } from '@nestjs/common';
import axios from 'axios';

@Controller('ai')
export class AiController {
  @Post()
  async handlePrompt(@Body() body: { prompt: string }) {
    const { prompt } = body;

    const aiUrl = process.env.AI_SERVICE_URL || 'http://ai-model:5000/generate';

    try {
      const { data } = await axios.post(aiUrl, {
        inputs: prompt,
      });

      const reply =
        data.generated_text ||
        data.outputs?.[0]?.generated_text ||
        '[empty response]';

      return { response: reply };
    } catch (error) {
      console.error('AI container error:', error.message);
      return { error: 'AI model unavailable or failed to respond' };
    }
  }
}