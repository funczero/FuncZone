import { ButtonBuilder, ButtonStyle, ActionRowBuilder } from 'discord.js';

export function createVerifyButton() {
  const button = new ButtonBuilder()
    .setCustomId('verify_user')
    .setLabel('Verificar-me')
    .setStyle(ButtonStyle.Success);

  return new ActionRowBuilder<ButtonBuilder>().addComponents(button);
}
