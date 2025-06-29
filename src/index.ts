import 'dotenv/config';
import { log } from './utils/logger';
import { startBot } from './core/loader';
import { env } from './config';

// Validação de variáveis obrigatórias
const requiredKeys = ['discordToken'] as const;
const missing = requiredKeys.filter((key) => !env[key]);

if (missing.length > 0) {
  log.fatal(`Variáveis ausentes no ambiente: ${missing.join(', ')}`);
}

// Tratamento global de exceções
process.on('uncaughtException', (err) => {
  log.fatal(`Exceção não capturada:\n${err instanceof Error ? err.stack : err}`);
});

process.on('unhandledRejection', (reason) => {
  log.fatal(`Rejeição não tratada:\n${reason instanceof Error ? reason.stack : reason}`);
});

// Inicialização do FuncZone
startBot().catch((error) => {
  log.fatal(`Erro ao iniciar o FuncZone:\n${error instanceof Error ? error.stack : error}`);
});
