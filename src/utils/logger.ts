import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import moment from 'moment-timezone';

// Emula __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Garante que a pasta de logs exista
const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Função de timestamp para São Paulo
const getTimestamp = () => moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');

// Formato limpo (para arquivos)
const fileFormat = winston.format.printf(({ level, message }) => {
  return `[${getTimestamp()}] [${level.toUpperCase()}]: ${message}`;
});

// Formato colorido (para console)
const consoleFormat = winston.format.combine(
  winston.format.colorize({ all: true }),
  winston.format.printf(({ level, message }) => {
    return `[${getTimestamp()}] [${level.toUpperCase()}]: ${message}`;
  })
);

// Logger construído com formatos distintos por destino
export const logger = winston.createLogger({
  level: 'debug',
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({ format: consoleFormat }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: fileFormat
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: fileFormat
    })
  ]
});

// Atalhos claros e padronizados
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
