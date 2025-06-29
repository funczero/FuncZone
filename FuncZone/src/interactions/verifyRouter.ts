import { ButtonInteraction } from 'discord.js';
import { verificationConfig } from '../verification.config.ts';
import { logger } from '../utils/logger';

export async function handleVerification(interaction: ButtonInteraction) {
  const member = interaction.guild?.members.cache.get(interaction.user.id);
  const role = interaction.guild?.roles.cache.find(r => r.name === verificationConfig.roleName);

  if (!member || !role) {
    return interaction.reply({ content: 'Configuração de verificação inválida.', ephemeral: true });
  }

  if (verificationConfig.allowBots === false && member.user.bot) {
    return interaction.reply({ content: 'Bots não podem se verificar.', ephemeral: true });
  }

  if (member.roles.cache.has(role.id)) {
    return interaction.reply({ content: 'Você já está verificado!', ephemeral: true });
  }

  try {
    await member.roles.add(role);
    return interaction.reply({ content: 'Verificação concluída!', ephemeral: true });
  } catch (error) {
    logger.error(`Erro ao aplicar verificação: ${String(error)}`);
    return interaction.reply({ content: 'Não foi possível aplicar o cargo.', ephemeral: true });
  }
}
