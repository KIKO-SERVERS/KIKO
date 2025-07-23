import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

export function createLoggerConfig(): winston.LoggerOptions {
  const isSimple = process.env.LOG_LEVEL === 'simple';

  if (isSimple) {
    return {
      level: 'error',
      format: winston.format.simple(),
      transports: [new winston.transports.Console()],
    };
  }

  return {
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      winston.format.errors({ stack: true }),
      winston.format.prettyPrint(),
    ),
    transports: [
      new winston.transports.Console({
        format: winston.format.combine(
          winston.format.colorize(),
          nestWinstonModuleUtilities.format.nestLike('NestApp', {
            prettyPrint: true,
          }),
        ),
      }),
    ],
  };
}
