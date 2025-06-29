import { Interaction, Client, ButtonInteraction } from 'discord.js';
import { handleVerification } from '../interactions/handleVerification.js';
import { handleHelpNavigation } from '../interactions/helpNavigator.js';
import { logger } from '../utils/logger.js';

export default async function interactionCreate(interaction: Interaction, client: Client): Promise<void> {
  if (!interaction.isButton()) return;

  try {
    switch (interaction.customId) {
      case 'verify_user':
        return handleVerification(interaction);

      case 'help_next':
      case 'help_back':
        return handleHelpNavigation(interaction, client);

      // Mais cases específicos
      default:
        return;
    }
  } catch (error) {
    logger.error(`Erro ao lidar com botão "${interaction.customId}": ${String(error)}`);
  }
}
