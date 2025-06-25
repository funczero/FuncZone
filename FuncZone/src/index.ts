import { config } from 'dotenv';
config();

import { BotClient } from './client/BotClient';
import guildMemberAdd from './events/guildMemberAdd';
import { logger } from './utils/logger';

const client = new BotClient();

client.on('guildMemberAdd', guildMemberAdd);

client.on('ready', () => {
  logger.info(`Bot online como ${client.user?.tag}`);
});

client.on('error', err => logger.error(`Erro no bot: ${err}`));

client.start(process.env.DISCORD_TOKEN!);
