import { Injectable, OnModuleInit } from '@nestjs/common';
import { Model, Recognizer } from 'vosk';
import mic from 'mic';
import * as path from 'path';

const MODEL_PATH = path.resolve(
  __dirname,
  '../../src/models/vosk-model-small-en-us-0.15',
);
const SAMPLE_RATE = 16000;

@Injectable()
export class SpeechService implements OnModuleInit {
  private recognizedTexts: string[] = [];
  private model: Model;
  private recognizer: Recognizer<any>;

  async onModuleInit() {
    this.model = new Model(MODEL_PATH);

    this.recognizer = new Recognizer<any>({
      model: this.model,
      sampleRate: SAMPLE_RATE,
    } as any);

    const micInstance = mic({
      rate: String(SAMPLE_RATE),
      channels: '1',
      debug: false,
      fileType: 'raw',
    });

    const micInputStream = micInstance.getAudioStream();

    micInputStream.on('data', (data: Buffer) => {
      if (this.recognizer.acceptWaveform(data)) {
        const result = this.recognizer.result();
        if (result.text) {
          console.log('🔊 Распознано:', result.text);
          this.recognizedTexts.push(result.text);
        }
      } else {
        const partial = this.recognizer.partialResult();
        console.log('…', partial.partial);
      }
    });

    micInputStream.on('error', (err: Error) => {
      console.error('🎤 Mic error:', err);
    });

    micInstance.start();
    console.log('🎤 Микрофон запущен и слушает...');
  }

  getRecognizedTexts() {
    const copy = [...this.recognizedTexts];
    this.recognizedTexts = [];
    return copy;
  }

  // Заглушки для контроллера
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create(createSpeechDto: any) {
    return { message: 'Создание пока не реализовано' };
  }
  findAll() {
    return { message: 'Получение всех записей пока не реализовано' };
  }
  findOne(id: number) {
    return { message: `Получение записи по id=${id} пока не реализовано` };
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(id: number, updateSpeechDto: any) {
    return { message: `Обновление записи id=${id} пока не реализовано` };
  }
  remove(id: number) {
    return { message: `Удаление записи id=${id} пока не реализовано` };
  }
}
