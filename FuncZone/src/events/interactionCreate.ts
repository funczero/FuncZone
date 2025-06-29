import { Interaction, Client, ButtonInteraction } from 'discord.js';
import { handleHelpNavigation } from '../interactions/helpNavigator.js';
import { handleVerification } from '../interactions/verifyRouter.js';
import { logger } from '../utils/logger.js';

export default async function interactionCreate(interaction: Interaction, client: Client): Promise<void> {
  if (!interaction.isButton()) return;

  try {
    const { customId } = interaction;

    // Verificação por botão
    if (['verify_user', 'verify_basic', 'verify_tos'].includes(customId)) {
      return handleVerification(interaction);
    }

    // Navegação no help
    if (customId === 'help_next' || customId === 'help_back') {
      return handleHelpNavigation(interaction, client);
    }

    // Outros botões aqui
  } catch (error) {
    logger.error(`Erro ao lidar com botão "${interaction.customId}": ${String(error)}`);
  }
}
