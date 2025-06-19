import { BotClient } from './client/BotClient';
import { config } from './config/env';
import { loadEvents } from './handlers/eventHandler';
import { loadCommands } from './handlers/commandHandler';
import { logger } from './logger/logger';

const client = new BotClient();

(async () => {
  try {
    await loadEvents(client);
    await loadCommands(client);
    await client.login(config.TOKEN);
    logger.info('[FuncZone] iniciado com sucesso!');
  } catch (err) {
    logger.error('Erro ao iniciar o bot:', err);
    process.exit(1);
  }
})();
