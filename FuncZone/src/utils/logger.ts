import winston from 'winston';
import moment from 'moment-timezone';

// Define fuso horário
const timezone = 'America/Sao_Paulo';

// Define cores personalizadas
const colors = {
  info: 'blue',
  warn: 'yellow',
  error: 'red',
  debug: 'magenta',
};

// Aplica as cores no Winston
winston.addColors(colors);

// Cria o logger customizado
export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    winston.format.printf(({ level, message }) => {
      const timestamp = moment().tz(timezone).format('DD/MM/YYYY HH:mm:ss');
      return `[${timestamp}] [${level}] ${message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
  ],
});
