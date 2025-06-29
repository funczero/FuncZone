import {
  Interaction,
  Client,
  ButtonInteraction,
  StringSelectMenuInteraction,
  ChannelSelectMenuInteraction,
  ModalSubmitInteraction
} from 'discord.js';

import { handleHelpNavigation } from '../interactions/helpNavigator.ts';
import { handleVerification } from '../interactions/verifyRouter.ts';
import { handleConfigInteraction } from '../interactions/configRouter.ts';
import { handleConfigModal } from '../interactions/handleConfigModal.ts';
import { logger } from '../utils/logger.ts';

export default async function interactionCreate(
  interaction: Interaction,
  client: Client
): Promise<void> {
  try {
    const { customId } = interaction as any;

    // Painel de configuração
    if (
      (interaction.isChannelSelectMenu() && customId === 'config_channel') ||
      (interaction.isButton() && customId.startsWith('config_'))
    ) {
      return handleConfigInteraction(interaction as ChannelSelectMenuInteraction | ButtonInteraction);
    }

    // Modal de edição de campos do painel
    if (interaction.isModalSubmit() && customId === 'config_modal') {
      return handleConfigModal(interaction as ModalSubmitInteraction);
    }

    // Verificação por botão
    if (interaction.isButton() && ['verify_user', 'verify_basic', 'verify_tos'].includes(customId)) {
      return handleVerification(interaction);
    }

    // Navegação no help
    if (interaction.isButton() && ['help_next', 'help_back'].includes(customId)) {
      return handleHelpNavigation(interaction, client);
    }
  } catch (error) {
    logger.error(`Erro ao lidar com interação: ${String(error)}`);
    if (interaction.isRepliable()) {
      await interaction.reply({ content: 'Não foi possível processar a interação.', ephemeral: true });
    }
  }
}
