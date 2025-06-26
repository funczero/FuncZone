import { BotClient } from '../client/BotClient';
import { logger } from '../utils/logger';
import { loadCommands } from '../handlers/commandHandler';
import { loadEvents } from '../handlers/eventHandler';
import messageCreate from '../events/messageCreate';

export async function startBot() {
  const client = new BotClient();

  await loadEvents(client);
  loadCommands(client);

  client.on('messageCreate', messageCreate);

  client.on('error', (error) => logger.error(`Erro interno: ${error.message}`));
  process.on('unhandledRejection', (reason) => logger.error(`Rejeição não tratada: ${reason}`));
  process.on('uncaughtException', (err) => logger.error(`Exceção não capturada: ${err.message}`));

  try {
    await client.start(process.env.DISCORD_TOKEN!);
    logger.info(`Bot conectado com sucesso como ${client.user?.tag}`);
  } catch (err) {
    logger.error(`Falha ao iniciar o bot: ${err}`);
    process.exit(1);
  }
}
