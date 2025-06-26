import { Message } from 'discord.js';

export const name = 'ping';
export const description = 'Retorna o ping do bot.';

export async function execute(message: Message) {
  const sent = await message.channel.send('🏓 Pingando...');
  const timeDiff = sent.createdTimestamp - message.createdTimestamp;
  await sent.edit(`🏓 Pong! Latência: \`${timeDiff}ms\``);
}
