import 'dotenv/config';
import { logger } from './utils/logger';
import { startBot } from './core/loader';

// Variáveis obrigatórias
const REQUIRED_ENV = ['DISCORD_TOKEN'] as const;
const missing = REQUIRED_ENV.filter(key => !process.env[key]);

if (missing.length) {
  logger.fatal(`Variáveis ausentes: ${missing.join(', ')}`);
  process.exit(1);
}

// Handler global de erros
process.on('uncaughtException', err => {
  logger.fatal(`Exceção não capturada: ${err instanceof Error ? err.stack : err}`);
  process.exit(1);
});

process.on('unhandledRejection', reason => {
  logger.fatal(`Rejeição não tratada: ${reason instanceof Error ? reason.stack : reason}`);
  process.exit(1);
});

// Inicia o bot
(async () => {
  try {
    await startBot();
  } catch (error) {
    logger.fatal(`Falha ao iniciar o FuncZone: ${error instanceof Error ? error.stack : error}`);
    process.exit(1);
  }
})();
