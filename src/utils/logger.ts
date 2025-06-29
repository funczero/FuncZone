import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import moment from 'moment-timezone';

// Emula __dirname no contexto de ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Garante que a pasta de logs exista
const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Formato profissional com horário de São Paulo
const logFormat = winston.format.combine(
  winston.format.printf(({ level, message }) => {
    const timestamp = moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss');
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  })
);

// Destinos de log
const transports: winston.transport[] = [
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      logFormat
    ),
  }),
  new winston.transports.File({
    filename: path.join(logDir, 'error.log'),
    level: 'error',
    format: logFormat,
  }),
  new winston.transports.File({
    filename: path.join(logDir, 'combined.log'),
    format: logFormat,
  }),
];

// Logger centralizado
export const logger = winston.createLogger({
  level: 'debug',
  levels: winston.config.npm.levels,
  transports,
});

// Atalhos de uso
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
      
