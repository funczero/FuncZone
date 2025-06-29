import {
  StringSelectMenuInteraction,
  ButtonInteraction,
  Interaction
} from 'discord.js';
import { configStore } from '../config/configStore.js';
import { logger } from '../utils/logger.js';
import { waitForResponse } from '../utils/waitForResponse.js';

export async function handleConfigInteraction(interaction: StringSelectMenuInteraction | ButtonInteraction) {
  const guildId = interaction.guildId;
  if (!guildId || !interaction.guild || !interaction.channel) return;

  try {
    const channel = interaction.channel;
    const user = interaction.user;

    // Menu de seleção
    if (interaction.isStringSelectMenu()) {
      const selected = interaction.values[0];

      switch (selected) {
        case 'config_role': {
          await interaction.reply({ content: '👤 Qual o nome exato do cargo de verificação?', ephemeral: true });
          // Lógica de captura vem depois
          break;
        }

        case 'config_message': {
          await interaction.reply({ content: '📝 Qual a nova mensagem de boas-vindas?', ephemeral: true });
          break;
        }

        case 'config_bots': {
          await interaction.reply({ content: '🤖 Permitir bots se verificarem? Envie `sim` ou `não`. ', ephemeral: true });
          break;
        }

        case 'config_buttons': {
          await interaction.reply({ content: '🔘 Personalização de botões ainda será implementada!', ephemeral: true });
          break;
        }

        default:
          await interaction.reply({ content: '❌ Opção inválida.', ephemeral: true });
      }
    }

    // Botões
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case 'config_save':
          return interaction.reply({ content: '💾 Configurações salvas com sucesso!', ephemeral: true });

        case 'config_reset':
          configStore.reset(guildId);
          return interaction.reply({ content: '🔁 Configurações restauradas para os padrões.', ephemeral: true });

        default:
          return;
      }
    }
  } catch (error) {
    logger.error(`Erro na configuração da guilda (${guildId}): ${String(error)}`);
    if (interaction.isRepliable()) {
      return interaction.reply({ content: '❌ Erro ao processar a configuração.', ephemeral: true });
    }
  }
}
