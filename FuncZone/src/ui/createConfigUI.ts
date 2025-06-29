import {
  ActionRowBuilder,
  ChannelSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle,
  ChannelType
} from 'discord.js';

export function createConfigUI() {
  const channelSelect = new ChannelSelectMenuBuilder()
    .setCustomId('config_channel')
    .setPlaceholder('Selecione o canal de verificação')
    .addChannelTypes(ChannelType.GuildText)
    .setMinValues(1)
    .setMaxValues(1);

  const buttons = [
    new ButtonBuilder()
      .setCustomId('config_edit_fields')
      .setLabel('🛠️ Editar campos')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('config_reset')
      .setLabel('🔁 Restaurar padrão')
      .setStyle(ButtonStyle.Secondary),
    new ButtonBuilder()
      .setCustomId('config_publish')
      .setLabel('📤 Enviar verificação')
      .setStyle(ButtonStyle.Primary)
  ];

  return [
    new ActionRowBuilder<ChannelSelectMenuBuilder>().addComponents(channelSelect),
    new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons)
  ];
}
