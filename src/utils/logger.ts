import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import winston from 'winston';
import moment from 'moment-timezone';

// Emula __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório de logs
const logDir = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Timestamp em São Paulo
const getTimestamp = (): string =>
  moment().tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss');

// Cores personalizadas por nível
winston.addColors({
  error: 'bold red',
  warn: 'yellow',
  info: 'cyan',
  debug: 'gray'
});

// Formato para arquivos
const fileFormat = winston.format.combine(
  winston.format.timestamp({ format: getTimestamp }),
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  })
);

// Formato seguro para console (evita códigos mal renderizados)
const consoleFormat = winston.format.combine(
  winston.format.timestamp({ format: getTimestamp }),
  winston.format.colorize({ message: true }), // Só colore a mensagem
  winston.format.printf(({ level, message, timestamp }) => {
    return `[${timestamp}] [${level.toUpperCase()}]: ${message}`;
  })
);

// Criação do logger
export const logger = winston.createLogger({
  level: 'debug',
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.Console({
      format: consoleFormat
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'error.log'),
      level: 'error',
      format: fileFormat
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'warn.log'),
      level: 'warn',
      format: fileFormat
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'info.log'),
      level: 'info',
      format: fileFormat
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'debug.log'),
      level: 'debug',
      format: fileFormat
    }),
    new winston.transports.File({
      filename: path.join(logDir, 'combined.log'),
      format: fileFormat
    })
  ],
  exitOnError: false
});

// Atalhos padronizados
export const log = {
  debug: (msg: string) => logger.debug(msg),
  info: (msg: string) => logger.info(msg),
  warn: (msg: string) => logger.warn(msg),
  error: (msg: string) => logger.error(msg),
  fatal: (msg: string) => {
    logger.error(`[FATAL]: ${msg}`);
    process.exit(1);
  }
};
