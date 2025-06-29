import {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  TextChannel
} from 'discord.js';
import { configStore } from '../config/configStore.js';
import { colors } from '../../assets/colors';

/**
 * Gera o embed e botões com base na configuração atual da guilda
 */
export function createVerificationComponents(guildId: string) {
  const config = configStore.get(guildId);

  const embed = new EmbedBuilder()
    .setColor(colors.blue)
    .setTitle('🔐 Verificação')
    .setDescription(config.message)
    .setTimestamp();

  const buttons = config.buttons.map(btn =>
    new ButtonBuilder()
      .setCustomId(btn.customId)
      .setLabel(btn.label)
      .setStyle(ButtonStyle[btn.style])
  );

  const components = [new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons)];

  return { embed, components };
}
