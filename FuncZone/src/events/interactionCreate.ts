import { Interaction, Client, ButtonInteraction } from 'discord.js';
import { handleVerification } from '../interactions/handleVerification.js';
import { logger } from '../utils/logger.js';

export default async function interactionCreate(interaction: Interaction, client: Client): Promise<void> {
  if (!interaction.isButton()) return;

  try {
    switch (interaction.customId) {
      case 'verify_user':
        await handleVerification(interaction);
        break;

      // Mais botões aqui futuramente
      default:
        break;
    }
  } catch (error) {
    logger.error(`Erro ao lidar com botão "${interaction.customId}": ${String(error)}`);
  }
}
