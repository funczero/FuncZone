import { BotClient } from '../client/BotClient';
import { logger } from '../utils/logger';
import { loadCommands } from '../handlers/commandHandler';
import { loadEvents } from '../handlers/eventHandler';

/**
 * Inicializa o bot: eventos, comandos, autenticação e listeners de erro.
 */
export async function startBot(): Promise<void> {
  const client = new BotClient();

  try {
    logger.info('Carregando eventos...');
    await loadEvents(client);

    logger.info('Carregando comandos...');
    await loadCommands(client);

    // Listeners para capturar falhas inesperadas
    client.on('error', (error) =>
      logger.fatal(`Erro interno do cliente Discord: ${error.message}`),
    );

    process.on('unhandledRejection', (reason) =>
      logger.fatal(`Rejeição não tratada: ${reason instanceof Error ? reason.stack : reason}`),
    );

    process.on('uncaughtException', (error) =>
      logger.fatal(`Exceção não capturada: ${error.stack}`),
    );

    const token = process.env.DISCORD_TOKEN;
    if (!token) {
      logger.fatal('Token do Discord ausente nas variáveis de ambiente.');
      process.exit(1);
    }

    await client.start(token);
    logger.success(`FuncZone autenticado como ${client.user?.tag}`);
  } catch (error) {
    const message = error instanceof Error ? error.stack : String(error);
    logger.fatal(`Falha crítica ao iniciar o FuncZone:\n${message}`);
    process.exit(1);
  }
}
