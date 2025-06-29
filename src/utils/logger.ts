import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import moment from 'moment-timezone';

// Suporte a ES Modules (__dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Garante diretório de logs
const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Função utilitária para gerar timestamp em São Paulo
const timestamp = () => moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');

// Formato base sem cor (para arquivos)
const fileFormat = winston.format.printf(({ level, message }) => {
  return `[${timestamp()}] [${level.toUpperCase()}]: ${message}`;
});

// Formato com cor para console
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message }) => {
    return `[${timestamp()}] [${level.toUpperCase()}]: ${message}`;
  })
);

// Criação do logger
export const logger = winston.createLogger({
  level: 'debug',
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: winston.format.combine(fileFormat)
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: winston.format.combine(fileFormat)
    }),
  ],
});

// Atalhos com encerramento controlado
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
