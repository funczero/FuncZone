import winston from 'winston';
import chalk from 'chalk';

const customFormat = winston.format.printf(({ level, message, timestamp }) => {
  const color = {
    info: chalk.blueBright,
    warn: chalk.yellow,
    error: chalk.red,
    debug: chalk.gray,
  }[level] || chalk.white;
//!
  return `${chalk.dim(timestamp)} [${color(level.toUpperCase())}] ${message}`;
});

export const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp({ format: 'HH:mm:ss' }),
    customFormat
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ],
});
