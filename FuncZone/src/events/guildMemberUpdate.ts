import { GuildMember, TextChannel } from 'discord.js';
import { config } from 'dotenv';
import { logger } from '../utils/logger';

config();

export default async function guildMemberUpdate(oldMember: GuildMember, newMember: GuildMember) {
  const boostChannelId = process.env.BOOST_CHANNEL_ID!;
  const boostChannel = newMember.guild.channels.cache.get(boostChannelId) as TextChannel;

  if (!boostChannel) {
    logger.warn('[Boost] Canal de boost não encontrado.');
    return;
  }

  // Verifica se o membro começou a impulsionar
  const oldBoosting = oldMember.premiumSince;
  const newBoosting = newMember.premiumSince;

  // Se antes não impulsionava e agora sim
  if (!oldBoosting && newBoosting) {
    await boostChannel.send(`💜 ${newMember} acabou de impulsionar o servidor! Muito obrigado pelo apoio! 🚀`);
    logger.info(`[Boost] ${newMember.user.tag} impulsionou o servidor.`);
  }
}
