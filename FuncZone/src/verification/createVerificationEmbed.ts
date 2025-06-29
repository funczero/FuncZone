import { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';
import { verificationConfig } from '../verification.config';
import { colors } from '../../assets/colors';

export function createVerificationComponents() {
  const embed = new EmbedBuilder()
    .setColor(colors.blue)
    .setTitle('🔐 Verificação')
    .setDescription(verificationConfig.customMessage)
    .setTimestamp();

  const buttons = verificationConfig.buttons.map(btn =>
    new ButtonBuilder()
      .setCustomId(btn.id)
      .setLabel(btn.label)
      .setStyle(ButtonStyle[btn.style as keyof typeof ButtonStyle])
  );

  return {
    embed,
    components: [new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons)]
  };
}
