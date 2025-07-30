import { Injectable, OnModuleInit } from '@nestjs/common';
import whisper from 'whisper-node';
import fs from 'fs';
import path from 'path';

@Injectable()
export class SpeechService implements OnModuleInit {
  private recognizedTexts: string[] = [];

  async onModuleInit() {
    const testFilePath = path.resolve(process.cwd(), 'src', 'testFiles', 'harvard.wav');

    console.log(`🎧 Начинаю транскрипцию файла: ${testFilePath}`);
  
    if (!fs.existsSync(testFilePath)) {
      console.error(`❌ Файл не найден: ${testFilePath}`);
      return;
    }
  
    const options = {
      modelName: 'base.en',
      whisperOptions: {
        language: 'auto',
        gen_file_txt: false,
        gen_file_subtitle: false,
        gen_file_vtt: false,
        word_timestamps: true,
      },
    };
  
    console.log(`🎧 Начинаю транскрипцию файла: ${testFilePath}`);
  
    try {
      const result = await whisper(testFilePath, options);
  
      if (!result || !result.text) {
        console.warn('⚠️ Пустой или некорректный результат транскрипции');
        return;
      }
  
      console.log('\n=== РАСПОЗНАННЫЙ ТЕКСТ ===');
      console.log(result.text);
      console.log('=========================\n');
  
      this.recognizedTexts.push(result.text);
    } catch (err) {
      console.error('❌ Ошибка транскрипции:', err);
    }
  }
  

  getRecognizedTexts() {
    const copy = [...this.recognizedTexts];
    this.recognizedTexts = [];
    return copy;
  }

  // Заглушки для контроллера

  create(createSpeechDto: any) {
    return {
      message: 'Создание записи речи пока не реализовано',
      body: createSpeechDto,
    };
  }

  findAll() {
    return {
      message: 'Получение всех распознанных текстов пока не реализовано',
    };
  }

  findOne(id: number) {
    return {
      message: `Получение записи речи с id=${id} пока не реализовано`,
    };
  }

  update(id: number, updateSpeechDto: any) {
    return {
      message: `Обновление записи речи с id=${id} пока не реализовано`,
      body: updateSpeechDto,
    };
  }

  remove(id: number) {
    return {
      message: `Удаление записи речи с id=${id} пока не реализовано`,
    };
  }
}
