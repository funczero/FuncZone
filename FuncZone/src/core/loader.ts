import { BotClient } from '@client/BotClient';
import { logger } from '@utils/logger';
import { loadCommands } from '@handlers/commandHandler';
import { loadEvents } from '@handlers/eventHandler';

/**
 * Inicializa o bot carregando eventos, comandos e conectando ao Discord.
 */
export async function startBot(): Promise<void> {
  const client = new BotClient();

  try {
    logger.info('Carregando eventos...');
    await loadEvents(client);

    logger.info('Carregando comandos...');
    await loadCommands(client);

    // Escuta erros do cliente e do processo
    client.on('error', (error) => logger.error(`Erro do cliente: ${error.message}`));
    process.on('unhandledRejection', (reason: unknown) =>
      logger.error(`Rejeição não tratada: ${String(reason)}`),
    );
    process.on('uncaughtException', (error: Error) =>
      logger.error(`Exceção não capturada: ${error.message}`),
    );

    // Inicia o bot
    const token = process.env.DISCORD_TOKEN;
    if (!token) {
      logger.fatal('Token do Discord não encontrado no ambiente.');
      process.exit(1);
    }

    await client.start(token);
    logger.success(`Bot conectado como ${client.user?.tag}`);
  } catch (error) {
    logger.fatal(`Falha crítica ao iniciar o bot: ${String(error)}`);
    process.exit(1);
  }
}
