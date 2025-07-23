import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class AppService {
  constructor(
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService,
  ) {
    this.logger.log('✅ Логгер инициализирован');
    this.logger.warn('⚠️ Предупреждение');
    this.logger.error('❌ Ошибка');
  }
  getHello(): string {
    return 'Hello World!';
  }
}
