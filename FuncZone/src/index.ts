import 'dotenv/config';
import { logger } from './utils/logger';
import { startBot } from './core/loader';

// Validação de variáveis obrigatórias
const required = ['DISCORD_TOKEN'] as const;
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  logger.fatal(`Variáveis ausentes no ambiente: ${missing.join(', ')}`);
  process.exit(1);
}

// Captura global de exceções
process.on('uncaughtException', (err) => {
  logger.fatal(`Exceção não capturada:\n${err instanceof Error ? err.stack : err}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal(`Rejeição não tratada:\n${reason instanceof Error ? reason.stack : reason}`);
  process.exit(1);
});

// Bootstrap do bot
startBot().catch((error) => {
  logger.fatal(`Erro ao iniciar o FuncZone:\n${error instanceof Error ? error.stack : error}`);
  process.exit(1);
});
