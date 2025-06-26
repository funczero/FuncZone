import { Message, PermissionsBitField } from 'discord.js';

export const name = 'clear';
export const description = 'Apaga uma quantidade de mensagens no canal.';

export async function execute(message: Message, args: string[]) {
  // Verifica se o autor tem permissão para gerenciar mensagens
  if (!message.member?.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
    return message.reply('Você não tem permissão para apagar mensagens.');
  }

  const amount = parseInt(args[0], 10);

  // Valida o argumento
  if (isNaN(amount) || amount < 1 || amount > 100) {
    return message.reply('Forneça um número entre 1 e 100 para apagar as mensagens.');
  }

  try {
    await message.channel.bulkDelete(amount, true);
    const reply = await message.channel.send(`${amount} mensagens apagadas com sucesso.`);
    setTimeout(() => reply.delete().catch(() => {}), 5000);
  } catch (error) {
    console.error('Erro ao apagar mensagens:', error);
    return message.reply('⚠️ Não foi possível apagar as mensagens.');
  }
}
