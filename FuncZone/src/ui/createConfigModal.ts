import {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder
} from 'discord.js';

export function createConfigModal() {
  const modal = new ModalBuilder()
    .setCustomId('config_modal')
    .setTitle('🛠️ Configurações de Verificação');

  const roleInput = new TextInputBuilder()
    .setCustomId('field_role')
    .setLabel('Cargo de verificação (exato)')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  const messageInput = new TextInputBuilder()
    .setCustomId('field_message')
    .setLabel('Mensagem de boas-vindas')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(true);

  const botsInput = new TextInputBuilder()
    .setCustomId('field_bots')
    .setLabel('Permitir bots? (sim ou não)')
    .setStyle(TextInputStyle.Short)
    .setRequired(true);

  modal.addComponents(
    new ActionRowBuilder<TextInputBuilder>().addComponents(roleInput),
    new ActionRowBuilder<TextInputBuilder>().addComponents(messageInput),
    new ActionRowBuilder<TextInputBuilder>().addComponents(botsInput)
  );

  return modal;
}
