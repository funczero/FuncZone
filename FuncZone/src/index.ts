import { config } from 'dotenv';
config();

import { logger } from './utils/logger';
import { BotClient } from './client/BotClient';
import messageCreate from './events/messageCreate';
import { loadEvents } from './handlers/eventHandler';
import { loadCommands } from './handlers/commandHandler';
import { startBot } from './core/loader';
startBot();

// Verifica se o token está presente no .env
if (!process.env.DISCORD_TOKEN) {
  logger.error('Token do bot não encontrado no arquivo .env!');
  process.exit(1);
}

const client = new BotClient();

// Carrega eventos automaticamente
loadEvents(client).then(() => {
  logger.info('Eventos carregados com sucesso.');
});

// Carrega comandos
loadCommands(client);

// Eventos dinâmicos
client.on('messageCreate', messageCreate);

// Tratamento de erros
client.on('error', (error) => {
  logger.error(`Erro interno no cliente Discord: ${error.message}`);
});

process.on('unhandledRejection', (reason: unknown) => {
  logger.error(`Rejeição não tratada: ${reason}`);
});

process.on('uncaughtException', (err) => {
  logger.error(`Exceção não capturada: ${err.message}`);
});

// Inicia o bot
client.start(process.env.DISCORD_TOKEN).catch((err) => {
  logger.error(`Erro ao iniciar o bot: ${err}`);
});
