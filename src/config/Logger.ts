import winston from 'winston';
import { Config } from './fileImport';

const Logger = winston.createLogger({
  level: 'info',
  defaultMeta: { service: 'auth-service' },
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
  ),
  transports: [
    new winston.transports.Console({
      level: 'info',
      silent: Config.NODE_ENV === 'test',
    }),

    new winston.transports.File({
      level: 'info',
      dirname: 'logs',
      filename: 'app.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      silent: Config.NODE_ENV === 'test',
    }),
    new winston.transports.File({
      level: 'error',
      dirname: 'logs',
      filename: 'error.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      silent: Config.NODE_ENV === 'test',
    }),
  ],
});

export default Logger;
