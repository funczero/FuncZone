import {
  ActionRowBuilder,
  StringSelectMenuBuilder,
  ButtonBuilder,
  ButtonStyle
} from 'discord.js';

export function createConfigUI() {
  const select = new StringSelectMenuBuilder()
    .setCustomId('config_menu')
    .setPlaceholder('Escolha o que deseja configurar')
    .addOptions([
      {
        label: 'Cargo de Verificação',
        value: 'config_role'
      },
      {
        label: 'Mensagem de Verificação',
        value: 'config_message'
      },
      {
        label: 'Permitir Bots',
        value: 'config_bots'
      },
      {
        label: 'Botões de Verificação',
        value: 'config_buttons'
      }
    ]);

  const buttons = [
    new ButtonBuilder()
      .setCustomId('config_save')
      .setLabel('💾 Salvar')
      .setStyle(ButtonStyle.Success),
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
    new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(select),
    new ActionRowBuilder<ButtonBuilder>().addComponents(...buttons)
  ];
}
