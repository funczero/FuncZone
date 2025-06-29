import { Events, Interaction, Client, ButtonInteraction } from 'discord.js';
import { handleVerification } from '../interactions/handleVerification';
import { logger } from '../utils/logger';

export default {
  name: Events.InteractionCreate,

  async execute(interaction: Interaction, client: Client) {
    if (interaction.isButton()) {
      try {
        if (interaction.customId === 'verify_user') {
          return handleVerification(interaction);
        }
      } catch (error) {
        logger.error(`Erro no botão "${interaction.customId}": ${String(error)}`);
      }
    }
  }
};
