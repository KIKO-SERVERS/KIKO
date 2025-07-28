import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import whisper from 'whisper-node';
import mic from 'mic';

const SAMPLE_RATE = 16000;
const RECORD_SECONDS = 2; // Быстрая порционная запись по 2 секунды

@Injectable()
export class SpeechService implements OnModuleInit, OnModuleDestroy {
  private recognizedTexts: string[] = [];
  private micInstance;
  private micInputStream;
  private audioChunks: Buffer[] = [];
  private recordTimeout: NodeJS.Timeout | null = null;
  private isProcessing = false;

  async onModuleInit() {
    this.micInstance = mic({
      rate: String(SAMPLE_RATE),
      channels: '1',
      debug: false,
      fileType: 'wav', // whisper лучше работает с wav
    });

    this.micInputStream = this.micInstance.getAudioStream();

    this.micInputStream.on('data', (data: Buffer) => {
      this.audioChunks.push(data);

      if (!this.recordTimeout) {
        this.recordTimeout = setTimeout(
          () => this.processAudio(),
          RECORD_SECONDS * 1000,
        );
      }
    });

    this.micInputStream.on('error', (err: Error) => {
      console.error('🎤 Mic error:', err);
    });

    this.micInstance.start();
    console.log('🎤 Микрофон запущен и слушает...');
  }

  async processAudio() {
    if (this.recordTimeout) {
      clearTimeout(this.recordTimeout);
      this.recordTimeout = null;
    }

    if (this.isProcessing) {
      // Если предыдущая транскрипция ещё не завершена, пропускаем этот цикл
      return;
    }

    if (this.audioChunks.length === 0) {
      return;
    }

    this.isProcessing = true;

    try {
      const audioBuffer = Buffer.concat(this.audioChunks);
      this.audioChunks = [];

      console.log(`🔊 Размер аудио буфера: ${audioBuffer.length} байт`);

      if (audioBuffer.length < 10000) {
        console.log('⚠️ Аудио слишком короткое, пропускаем транскрибацию');
        this.isProcessing = false;
        return;
      }

      const fs = await import('fs/promises');
      const os = await import('os');
      const path = await import('path');

      const tmpDir = os.tmpdir();
      const tmpFilePath = path.join(tmpDir, `mic_record_${Date.now()}.wav`);

      await fs.writeFile(tmpFilePath, audioBuffer);

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

      console.log(`🕐 Запускаю транскрипцию файла ${tmpFilePath}...`);

      try {
        const transcript = await whisper(tmpFilePath, options);

        console.log('test-transcript', transcript);
        if (!transcript || !transcript.text) {
          console.warn('⚠️ Пустой или некорректный результат транскрипции');
        } else {
          console.log('\n=== РАСПОЗНАННЫЙ ТЕКСТ ===');
          console.log(transcript.text);
          console.log('=========================\n');
          this.recognizedTexts.push(transcript.text);
        }
      } catch (error) {
        console.error('❌ Ошибка транскрипции whisper:', error);
      }

      await fs.unlink(tmpFilePath);
    } catch (e) {
      console.error('❌ Ошибка транскрибации whisper:', e);
    } finally {
      this.isProcessing = false;
    }
  }

  getRecognizedTexts() {
    const copy = [...this.recognizedTexts];
    this.recognizedTexts = [];
    return copy;
  }

  async onModuleDestroy() {
    if (this.micInstance) {
      this.micInstance.stop();
    }
  }

  // Заглушки для контроллера
  create(createSpeechDto: any) {
    return { message: 'Создание пока не реализовано' };
  }
  findAll() {
    return { message: 'Получение всех записей пока не реализовано' };
  }
  findOne(id: number) {
    return { message: `Получение записи по id=${id} пока не реализовано` };
  }
  update(id: number, updateSpeechDto: any) {
    return { message: `Обновление записи id=${id} пока не реализовано` };
  }
  remove(id: number) {
    return { message: `Удаление записи id=${id} пока не реализовано` };
  }
}
