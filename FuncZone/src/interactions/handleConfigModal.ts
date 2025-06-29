import { ModalSubmitInteraction } from 'discord.js';
import { configStore } from '../config/configStore.js';

export async function handleConfigModal(interaction: ModalSubmitInteraction) {
  const guildId = interaction.guildId;
  if (!guildId) return;

  try {
    const roleName = interaction.fields.getTextInputValue('field_role')?.trim();
    const message = interaction.fields.getTextInputValue('field_message')?.trim();
    const botsValue = interaction.fields.getTextInputValue('field_bots')?.trim().toLowerCase();

    const allowBots = ['sim', 's', 'yes', 'y'].includes(botsValue);

    if (!roleName || !message) {
      return interaction.reply({
        content: '❌ Todos os campos são obrigatórios.',
        ephemeral: true
      });
    }

    configStore.set(guildId, {
      roleName,
      message,
      allowBots
    });

    return interaction.reply({
      content: '✅ Campos atualizados com sucesso!',
      ephemeral: true
    });
  } catch (err) {
    console.error('Erro ao processar modal:', err);
    return interaction.reply({
      content: '❌ Erro ao salvar as configurações.',
      ephemeral: true
    });
  }
}
