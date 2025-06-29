import { GuildMember, TextChannel } from 'discord.js';
import { env } from '../config';
import { logger } from '../utils/logger';

export default async function guildMemberUpdate(oldMember: GuildMember, newMember: GuildMember) {
  const boostChannel = newMember.guild.channels.cache.get(env.boostChannelId) as TextChannel | undefined;

  if (!boostChannel) {
    logger.warn('[Boost] Canal de boost não encontrado.');
    return;
  }

  const oldBoosting = oldMember.premiumSince;
  const newBoosting = newMember.premiumSince;

  if (!oldBoosting && newBoosting) {
    const message = `💜 ${newMember} acabou de impulsionar o servidor! Muito obrigado pelo apoio! 🚀`;
    await boostChannel.send(message);
    logger.info(`[Boost] ${newMember.user.tag} impulsionou o servidor.`);
  }
}
