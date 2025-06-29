import {
  GuildMember,
  EmbedBuilder,
  Message
} from 'discord.js';
import { icons } from '../../assets/icons';
import { colors } from '../../assets/colors';
import type { Command } from '../types';

/**
 * Converte uma duração curta (ex: 10m, 2h, 1d) para milissegundos.
 */
function convertToMilliseconds(tempo: string): number | null {
  const regex = /^(\d+)([smhd])$/;
  const match = tempo.match(regex);
  if (!match) return null;

  const valor = parseInt(match[1], 10);
  const unidade = match[2];

  switch (unidade) {
    case 's': return valor * 1000;
    case 'm': return valor * 60 * 1000;
    case 'h': return valor * 60 * 60 * 1000;
    case 'd': return valor * 24 * 60 * 60 * 1000;
    default: return null;
  }
}

const command: Command = {
  name: 'mute',
  description: 'Aplica um timeout (mute) em um membro.',
  usage: '.mute <@usuário> <duração> [motivo]',
  userPermissions: ['ModerateMembers'],
  botPermissions: ['ModerateMembers'],
  deleteMessage: true,

  async execute(message: Message, args: string[]) {
    const membro = message.mentions.members?.first() || message.guild?.members.cache.get(args[0] ?? '');
    const tempo = args[1];
    const motivo = args.slice(2).join(' ') || 'Não especificado.';

    if (!membro) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(colors.yellow)
            .setAuthor({
              name: 'Mencione um usuário para executar esta ação.',
              iconURL: icons.icon_attention
            })
        ],
        allowedMentions: { repliedUser: false }
      });
    }

    if (!tempo) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(colors.yellow)
            .setAuthor({
              name: 'Defina um tempo de duração para prosseguir (ex: 1m, 1h, 1d).',
              iconURL: icons.icon_attention
            })
        ],
        allowedMentions: { repliedUser: false }
      });
    }

    const duracao = convertToMilliseconds(tempo);
    if (!duracao) {
      return message.channel.send({
        embeds: [
          new EmbedBuilder()
            .setColor(colors.yellow)
            .setAuthor({
              name: 'Duração inválida. Use algo como 1m, 1h ou 1d.',
              iconURL: icons.icon_attention
            })
        ],
        allowedMentions: { repliedUser: false }
      });
    }

    if (!membro.moderatable) {
      return message.channel.send({
        embeds
