import { GuildMember, EmbedBuilder, TextChannel, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { config } from 'dotenv';
config();

export default async function guildMemberAdd(member: GuildMember) {
  const channel = member.guild.channels.cache.get(process.env.WELCOME_CHANNEL_ID!) as TextChannel;
  if (!channel) return;

  const embed = new EmbedBuilder()
    .setColor('#5865F2')
    .setTitle('👋 Seja bem-vindo(a) à FuncZone!')
    .setDescription('Agora você faz parte da nossa comunidade!\nRespeite as regras, divirta-se e aproveite ao máximo essa experiência.')
    .addFields(
      { name: '🧾 ID do usuário:', value: `${member.id}`, inline: false },
      { name: '📊 Membros:', value: `Com a sua entrada, agora somos **${member.guild.memberCount}** membros!`, inline: false }
    )
    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
    .setTimestamp();

  const row = new ActionRowBuilder<ButtonBuilder>().addComponents(
    new ButtonBuilder()
      .setLabel('Regras')
      .setStyle(ButtonStyle.Link)
      .setURL('https://example.com/regras')
      .setEmoji('📜'),
    new ButtonBuilder()
      .setLabel('Avisos')
      .setStyle(ButtonStyle.Link)
      .setURL('https://example.com/avisos')
      .setEmoji('📢'),
    new ButtonBuilder()
      .setLabel('Suporte')
      .setStyle(ButtonStyle.Link)
      .setURL('https://example.com/suporte')
      .setEmoji('❓')
  );

  await channel.send({ embeds: [embed], components: [row] });
}
