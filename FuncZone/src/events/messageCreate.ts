import type { Message } from 'discord.js';
import { botConfig } from '../config/botConfig';
import type { BotClient } from '../client/BotClient';
import { logger } from '../utils/logger';
import type { Command } from '../types';

/**
 * Evento disparado ao receber uma nova mensagem
 */
export default async function messageCreate(message: Message, client: BotClient): Promise<void> {
  // Ignora mensagens de bots ou fora de servidores
  if (message.author.bot || !message.guild) return;

  // Verifica se a mensagem começa com o prefixo
  if (!message.content.startsWith(botConfig.prefix)) return;

  const args = message.content.slice(botConfig.prefix.length).trim().split(/\s+/);
  const commandName = args.shift()?.toLowerCase();

  if (!commandName) return;

  // Busca o comando, incluindo aliases
  const command: Command | undefined = client.commands.get(commandName)
    ?? [...client.commands.values()].find(cmd => cmd.aliases?.includes(commandName));

  if (!command) return;

  try {
    logger.info(`Comando executado: ${command.name} por ${message.author.tag}`);
    await command.execute(message, args, client);
  } catch (error) {
    logger.error(`Erro no comando "${command.name}": ${String(error)}`);
    await message.reply('⚠️ Não foi possível executar este comando.');
  }
}
