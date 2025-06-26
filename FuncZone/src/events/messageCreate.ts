// src/events/messageCreate.ts

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
  const command = client.commands?.get(commandName!);

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    logger.error(`Erro ao executar comando "${commandName}": ${err}`);
    await message.reply('Ocorreu um erro ao executar este comando.');
  }
}
