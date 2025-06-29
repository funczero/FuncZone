import { EmbedBuilder, Message } from 'discord.js';
import { colors } from '../../assets/colors';
import { icons } from '../../assets/icons';
import type { Command } from '../types';

const command: Command = {
  name: 'ban',
  description: 'Bane um membro do servidor.',
  usage: '${currentPrefix}ban <@usuário> [motivo]',
  userPermissions: ['BanMembers'],
  botPermissions: ['BanMembers'],
  deleteMessage: true,

  async execute(message: Message, args: string[]) {
    const membro = message.mentions.members?.first() || message.guild?.members.cache.get(args[0] ?? '');
    const motivo = args.slice(1).join(' ') || 'Não especificado.';

    if (!membro) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(colors.yellow)
            .setAuthor({
              name: 'Mencione um usuário para executar esta ação.',
              iconURL: icons.attention
            })
        ],
        allowedMentions: { repliedUser: false }
      });
    }

    if (!membro.bannable) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(colors.yellow)
            .setAuthor({
              name: 'Este usuário não pode ser banido devido às suas permissões.',
              iconURL: icons.attention
            })
        ],
        allowedMentions: { repliedUser: false }
      });
    }

    try {
      await membro.ban({ reason: motivo });

      const embed = new EmbedBuilder()
        .setTitle('<:emoji_49:1207525971884900373> Punição aplicada')
        .setColor(colors.red)
        .setDescription(`${membro} (\`${membro.id}\`) foi banido(a)!`)
        .addFields({ name: 'Motivo', value: `\`${motivo}\`` })
        .setThumbnail(membro.user.displayAvatarURL({ dynamic: true }))
        .setFooter({
          text: message.author.username,
          iconURL: message.author.displayAvatarURL({ dynamic: true })
        })
        .setTimestamp();

      return message.channel.send({
        embeds: [embed],
        allowedMentions: { repliedUser: false }
      });
    } catch (error) {
      console.error(error);
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(colors.yellow)
            .setAuthor({
              name: 'Não foi possível banir o usuário devido a um erro.',
              iconURL: icons.attention
            })
        ],
        allowedMentions: { repliedUser: false }
      });
    }
  }
};

export default command;
