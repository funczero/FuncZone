/**
 * Inicialização principal do projeto FuncZone
 * Este arquivo é o ponto de entrada da aplicação.
 */

import { config } from 'dotenv';
config();

import { logger } from './utils/logger';
import { startBot } from './core/loader';

// Verificação crítica: token do bot
if (!process.env.DISCORD_TOKEN) {
  logger.error('Variável DISCORD_TOKEN ausente no arquivo .env!');
  process.exit(1);
}

// Inicialização do bot
startBot().catch((err) => {
  logger.error(`Falha ao iniciar o bot: ${err}`);
  process.exit(1);
});
