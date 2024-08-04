import { LoggerService } from '@nestjs/common';
import { Logger, createLogger, transports, format } from 'winston';

const { combine, timestamp, printf, colorize } = format;

const objectStringifier = format((info) => {
  const stringifyObjects = (obj: any): any => {
    if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
          obj[key] = JSON.stringify(obj[key]);
        }
      });
    }
    return obj;
  };

  info.message = stringifyObjects(info.message);
  return info;
});

export class WinstonLogger implements LoggerService {
  private logger: Logger;

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: combine(
        timestamp(),
        objectStringifier(),
        printf((info) => {
          const { timestamp, level, message, ...extra } = info;
          return `[${process.env.NODE_ENV?.toUpperCase()}] ${timestamp} ${level}: ${
            typeof message === 'object' ? JSON.stringify(message) : message
          } ${Object.keys(extra).length ? JSON.stringify(extra) : ''}`;
        }),
      ),
      transports: [
        new transports.Console({
          level: 'debug',
          handleExceptions: true,
          format: combine(
            timestamp(),
            colorize(),
            objectStringifier(),
            printf((info) => {
              const { timestamp, level, message, ...extra } = info;
              return `[${process.env.NODE_ENV?.toUpperCase()}] ${timestamp} ${level}: ${
                typeof message === 'object' ? JSON.stringify(message) : message
              } ${Object.keys(extra).length ? JSON.stringify(extra) : ''}`;
            }),
          ),
        }),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
      ],
    });
  }

  log(message: any, ...optionalParams: any[]) {
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, trace?: string, ...optionalParams: any[]) {
    const errorMessage = trace ? `${message} - ${trace}` : message;
    this.logger.error(errorMessage, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]) {
    this.logger.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]) {
    this.logger.debug(message, ...optionalParams);
  }

  verbose(message: any, ...optionalParams: any[]) {
    this.logger.verbose(message, ...optionalParams);
  }
}
