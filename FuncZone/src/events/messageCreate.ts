import { Message } from 'discord.js';
import { botConfig } from '../config/botConfig';
import { BotClient } from '../client/BotClient';
import { logger } from '../utils/logger';

export default async function messageCreate(message: Message) {
  const client = message.client as BotClient;

  if (message.author.bot || !message.guild) return;
  if (!message.content.startsWith(botConfig.prefix)) return;

  const args = message.content.slice(botConfig.prefix.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName || !client.commands.has(commandName)) return;

  const command = client.commands.get(commandName);

  try {
    await command?.execute(message, args);
  } catch (error) {
    logger.error(`Erro ao executar o comando "${commandName}": ${error}`);
    await message.reply('⚠️ Não foi possível executar este comando.');
  }
}
