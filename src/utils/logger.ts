import winston from 'winston';
import path from 'path';

const logDir = path.join(__dirname, '../../logs');

// Define os formatos
const logFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.printf(({ timestamp, level, message }) => `[${timestamp}] [${level.toUpperCase()}]: ${message}`)
);

// Transports para diferentes saídas
const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      logFormat
    ),
  }),
  new winston.transports.File({ filename: `${logDir}/error.log`, level: 'error', format: logFormat }),
  new winston.transports.File({ filename: `${logDir}/combined.log`, format: logFormat }),
];

// Criação do logger
export const logger = winston.createLogger({
  level: 'debug', // mínimo nível exibido
  levels: winston.config.npm.levels,
  transports,
});

// Atalho para facilitar
export const log = {
  debug: (msg: string) => logger.debug(msg),
  info: (msg: string) => logger.info(msg),
  warn: (msg: string) => logger.warn(msg),
  error: (msg: string) => logger.error(msg),
  fatal: (msg: string) => {
    logger.error(`[FATAL] ${msg}`);
    process.exit(1);
  }
};
