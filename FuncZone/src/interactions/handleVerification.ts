import { ButtonInteraction, EmbedBuilder } from 'discord.js';
import { colors } from '../assets/colors';
import { icons } from '../assets/icons';

export async function handleVerification(interaction: ButtonInteraction) {
  const role = interaction.guild?.roles.cache.find(r => r.name.toLowerCase() === 'verificado');
  const member = interaction.guild?.members.cache.get(interaction.user.id);

  if (!role || !member) {
    return interaction.reply({
      content: 'O cargo de verificado não foi encontrado.',
      ephemeral: true
    });
  }

  if (member.roles.cache.has(role.id)) {
    return interaction.reply({
      content: 'Você já está verificado!',
      ephemeral: true
    });
  }

  try {
    await member.roles.add(role);

    const embed = new EmbedBuilder()
      .setColor(colors.green)
      .setAuthor({
        name: 'Verificação concluída!',
        iconURL: icons.icon_success
      })
      .setDescription('Você recebeu acesso ao servidor.')
      .setTimestamp();

    return interaction.reply({ embeds: [embed], ephemeral: true });
  } catch (error) {
    console.error(error);
    return interaction.reply({
      content: 'Ocorreu um erro ao aplicar o cargo.',
      ephemeral: true
    });
  }
}
