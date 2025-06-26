import { config } from 'dotenv';
config();

import { logger } from './utils/logger';
import { BotClient } from './client/BotClient';
import onReady from './events/ready';
import guildMemberAdd from './events/guildMemberAdd';

// • Verifica se o token está presente no .env
if (!process.env.DISCORD_TOKEN) {
  logger.error('Token do bot não encontrado no arquivo .env!');
  process.exit(1);
}

const client = new BotClient();

// Eventos principais
client.once('ready', () => onReady(client));
client.on('guildMemberAdd', guildMemberAdd);

// Eventos de erro
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
