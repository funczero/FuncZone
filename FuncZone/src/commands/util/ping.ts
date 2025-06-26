import { Message } from 'discord.js';

export default {
  name: 'ping',
  aliases: ['latency'],
  description: 'Mostra a latência do bot.',
  async execute(message: Message, args: string[]) {
    try {
      const sent = await message.reply('🏓 Calculando ping...');
      const latency = sent.createdTimestamp - message.createdTimestamp;
      const apiLatency = Math.round(message.client.ws.ping);

      await sent.edit(
        `🏓 Pong!\nLatência de mensagem: **${latency}ms**\nLatência da API: **${apiLatency}ms**`
      );
    } catch (error) {
      console.error('Erro ao executar o comando ping:', error);
      await message.reply('⚠️ Não foi possível calcular o pig.');
    }
  },
};
