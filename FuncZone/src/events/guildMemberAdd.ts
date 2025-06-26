import {
  GuildMember,
  EmbedBuilder,
  TextChannel,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} from 'discord.js';
import { config } from 'dotenv';
config();

export default async function guildMemberAdd(member: GuildMember) {
  const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID!) as TextChannel;
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor('#8c9cfc')
    .setTitle('Seja bem-vindo(a) à FuncZone!')
    .setDescription(
      `Agora você faz parte da nossa comunidade! Respeite as regras, divirta-se e aproveite ao máximo essa experiência.\n\n` +
      `<:user:1372710533718867978> **ID do usuário:** \`${member.id}\`\n` +
      `<:members:1372710492761755709> Com a sua entrada, agora somos **${member.guild.memberCount}** membros!`
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Regras')
      .setStyle(ButtonStyle.Link)
      .setURL(process.env.RULES_URL!)
      .setEmoji('1372713919365386302'),
    new ButtonBuilder()
      .setLabel('Avisos')
      .setStyle(ButtonStyle.Link)
      .setURL(process.env.ANNOUNCEMENTS_URL!)
      .setEmoji('1372713996011966545'),
    new ButtonBuilder()
      .setLabel('Suporte')
      .setStyle(ButtonStyle.Link)
      .setURL(process.env.SUPPORT_URL!)
      .setEmoji('1372714108629291069')
  );

  await channel.send({
    content: `${member}`,
    embeds: [embed],
    components: [row],
  });
}
