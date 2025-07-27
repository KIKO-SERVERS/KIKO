import { join } from 'path';

export default () => ({
  nodeEnv: process.env.NODE_ENV ?? 'production',
  port: parseInt(process.env.PORT ?? '3000', 10),

  ai: {
    serviceUrl: process.env.AI_SERVICE_URL ?? 'http://ai-model:5000/generate',
  },

  aiModel: {
    modelId: process.env.MODEL_ID ?? 'TinyLlama/TinyLlama-1.1B-Chat-v1.0',
    quantize: process.env.QUANTIZE ?? 'bitsandbytes-nf4',
    maxInputLength: parseInt(process.env.MAX_INPUT_LENGTH ?? '1024', 10),
    maxTotalTokens: parseInt(process.env.MAX_TOTAL_TOKENS ?? '2048', 10),
  },
});
