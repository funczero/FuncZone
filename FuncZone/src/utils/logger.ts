import winston from 'winston';
import moment from 'moment-timezone';

const timezone = 'America/Sao_Paulo';

// Níveis personalizados
const customLevels = {
  fatal: 0,
  error: 1,
  warn: 2,
  success: 3,
  info: 4,
  debug: 5
};

// Cores personalizadas
const customColors = {
  fatal: 'bgRed',
  error: 'red',
  warn: 'yellow',
  success: 'green',
  info: 'blue',
  debug: 'magenta'
};

winston.addColors(customColors);

// Formato do log
const logFormat = winston.format.printf(({ level, message }) => {
  const timestamp = moment().tz(timezone).format('DD/MM/YYYY HH:mm:ss');
  return `[${timestamp}] [${level}] ${message}`;
});

// Criação do logger
export const logger = winston.createLogger({
  levels: customLevels,
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    logFormat
  ),
  transports: [
    new winston.transports.Console()
  ]
});

// Tipagem para uso futuro
export type Logger = typeof logger;
