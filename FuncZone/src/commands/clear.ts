import {
  Message,
  EmbedBuilder,
  User,
  PermissionsBitField,
} from 'discord.js';
import { icons } from '../../assets/icons.js';

export const name = 'clear';
export const description = 'Apaga mensagens do canal, com suporte a menção de usuário.';
export const usage = '.clear <quantidade> [@usuário]';
export const userPermissions = ['ManageMessages'];
export const botPermissions = ['ManageMessages'];
export const deleteMessage = true;

export async function execute(message: Message, args: string[]): Promise<void> {
  const quantidade = parseInt(args[0], 10);
  const usuario: User | undefined = message.mentions.users.first();

  if (!quantidade || isNaN(quantidade) || quantidade < 1 || quantidade > 100) {
    const embedErro = new EmbedBuilder()
      .setColor('Yellow')
      .setDescription(`${icons.warning} Só é possível excluir de 1 a 100 mensagens por vez.`);

    await message.channel.send({
      embeds: [embedErro],
      allowedMentions: { repliedUser: false },
    });
    return;
  }

  try {
    const mensagens = await message.channel.messages.fetch({ limit: 100 });

    const mensagensParaApagar = Array.from(
      mensagens
        .filter((msg) =>
          usuario
            ? msg.author.id === usuario.id && !msg.pinned
            : !msg.pinned
        )
        .values()
    ).slice(0, quantidade);

    const apagadas = await message.channel.bulkDelete(mensagensParaApagar, true);

    const feedbackMessage = await message.channel.send(
      `${icons.success} ${apagadas.size} mensagens foram apagadas${usuario ? ` de ${usuario}` : ''}.`
    );

    setTimeout(() => {
      feedbackMessage.delete().catch(() => null);
    }, 4000);
  } catch (error) {
    console.error(error);

    const embedErro = new EmbedBuilder()
      .setColor('Red')
      .setDescription(`${icons.warning} Não foi possível apagar as mensagens.`);

    await message.channel.send({
      embeds: [embedErro],
      allowedMentions: { repliedUser: false },
    });
  }
}
