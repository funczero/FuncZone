import {
  GuildMember,
  EmbedBuilder,
  TextChannel,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import { env } from '../config';

export default async function guildMemberAdd(member: GuildMember) {
  const channel = member.guild.channels.cache.get(env.welcomeChannelId) as TextChannel;
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor('#8c9cfc')
    .setTitle('Seja bem-vindo(a) à FuncZone!')
    .setDescription([
      'Agora você faz parte da nossa comunidade! Respeite as regras, divirta-se e aproveite ao máximo essa experiência.',
      '',
      `<:user:1404144437759709265> **ID do usuário**: \`${member.id}\``,
      `<:members:1404144495108296806> Com a sua entrada, agora somos **${member.guild.memberCount}** membros!`
    ].join('\n'))
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Regras')
      .setStyle(ButtonStyle.Link)
      .setURL(env.rulesUrl)
      .setEmoji('1372713919365386302'),
    new ButtonBuilder()
      .setLabel('Avisos')
      .setStyle(ButtonStyle.Link)
      .setURL(env.announcementsUrl)
      .setEmoji('1372713996011966545'),
    new ButtonBuilder()
      .setLabel('Suporte')
      .setStyle(ButtonStyle.Link)
      .setURL(env.supportUrl)
      .setEmoji('1372714108629291069')
  );

  await channel.send({
    content: `${member}`,
    embeds: [embed],
    components: [row],
  });
}
