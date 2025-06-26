/**
 * Inicialização principal do projeto FuncZone
 */

import { config } from 'dotenv';
config();

import { logger } from './utils/logger';
import { startBot } from './core/loader';

// Verificação crítica do token
if (!process.env.DISCORD_TOKEN) {
  logger.error('Variável DISCORD_TOKEN ausente no .env!');
  process.exit(1);
}

// Inicialização principal
startBot().catch((err) => {
  logger.error(`Falha ao iniciar o bot: ${err}`);
  process.exit(1);
});
