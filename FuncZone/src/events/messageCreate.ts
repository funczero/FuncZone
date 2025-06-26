import { Message } from 'discord.js';
import { commands, aliases } from '../handlers/commandHandler';
import { config } from 'dotenv';
config();

const prefix = process.env.PREFIX!;

export default async function messageCreate(message: Message) {
  if (message.author.bot || !message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmdName = args.shift()!.toLowerCase();

  const command =
    commands.get(cmdName) || commands.get(aliases.get(cmdName) || '');

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (err) {
    console.error(`Erro ao executar o comando ${cmdName}:`, err);
    await message.reply('⚠️ Não foi possível executar este comando.');
  }
}
