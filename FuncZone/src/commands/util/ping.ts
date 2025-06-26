import { Message } from 'discord.js';

export default {
  name: 'ping',
  aliases: ['latency'],
  description: 'Mostra a latência do bot.',
  async execute(message: Message, args: string[]) {
    const sent = await message.reply('🏓 Calculando ping...');
    const latency = sent.createdTimestamp - message.createdTimestamp;
    await sent.edit(`🏓 Pong! Latência: **${latency}ms**`);
  },
};
