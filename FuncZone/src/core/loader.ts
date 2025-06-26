import { BotClient } from '../client/BotClient';
import { logger } from '../utils/logger';
import { loadCommands } from '../handlers/commandHandler';
import { loadEvents } from '../handlers/eventHandler';

/**
 * Função principal para iniciar o bot
 */
export async function startBot(): Promise<void> {
  const client = new BotClient();

  try {
    // Carrega eventos e comandos
    await loadEvents(client);
    await loadCommands(client);

    // Eventos globais de erro
    client.on('error', (error) => logger.error(`Erro interno: ${error.message}`));
    process.on('unhandledRejection', (reason) => logger.error(`Rejeição não tratada: ${reason}`));
    process.on('uncaughtException', (err) => logger.error(`Exceção não capturada: ${err.message}`));

    // Inicia o bot
    await client.start(process.env.DISCORD_TOKEN!);
    logger.info(`Bot conectado como ${client.user?.tag}`);
  } catch (err) {
    logger.error(`Falha ao iniciar o bot: ${err}`);
    process.exit(1);
  }
}
