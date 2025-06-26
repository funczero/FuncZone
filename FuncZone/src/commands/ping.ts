import { Message } from 'discord.js';

export const name = 'ping';
export const description = 'Retorna o ping do bot.';

export async function execute(message: Message, args: string[]) {
  const sent = await message.channel.send('🏓 Calculando...');
  const latency = sent.createdTimestamp - message.createdTimestamp;
  await sent.edit(`🏓 Pong! Latência: \`${latency}ms\``);
}
