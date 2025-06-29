import 'dotenv/config';
import { logger } from './utils/logger';
import { startBot } from './core/loader';
import { env } from './config';

// Validação de variáveis obrigatórias
const requiredKeys = ['discordToken'] as const;
const missing = requiredKeys.filter((key) => !env[key]);

if (missing.length > 0) {
  logger.fatal(`Variáveis ausentes no ambiente: ${missing.join(', ')}`);
  process.exit(1);
}

// Tratamento global de exceções não capturadas
process.on('uncaughtException', (err) => {
  logger.fatal(`Exceção não capturada:\n${err instanceof Error ? err.stack : err}`);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.fatal(`Rejeição não tratada:\n${reason instanceof Error ? reason.stack : reason}`);
  process.exit(1);
});

// Inicialização do bot
startBot().catch((error) => {
  logger.fatal(`Erro ao iniciar o FuncZone:\n${error instanceof Error ? error.stack : error}`);
  process.exit(1);
});
