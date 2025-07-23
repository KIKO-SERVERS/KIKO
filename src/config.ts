import * as dotenv from 'dotenv';

dotenv.config(); // загружает .env из корня проекта

export const config = {
  AI_SERVICE_URL: process.env.AI_SERVICE_URL || 'http://localhost:5000/generate',
};

