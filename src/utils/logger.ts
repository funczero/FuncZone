import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import moment from 'moment-timezone';

// Emula __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Cria pasta de logs se necessário
const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Timestamp formatado corretamente para São Paulo
const timestampFormat = winston.format((info) => {
  const now = moment().tz('America/Sao_Paulo');
  info.timestamp = now.format('DD/MM/YYYY HH:mm:ss');
  return info;
});

// Formato base dos logs
const baseFormat = winston.format.printf(({ timestamp, level, message }) => {
  return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
});

// Logger configurado com precisão
export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    timestampFormat(),
    baseFormat
  ),
  transports: [
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error'
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log')
    }),
    new winston.transports.Console({
      format: winston.format.combine(
        timestampFormat(),
        winston.format.colorize({ all: true }),
        baseFormat
      )
    })
  ]
});

// Atalhos simples e claros
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
