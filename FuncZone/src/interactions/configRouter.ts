import {
  StringSelectMenuInteraction,
  ButtonInteraction
} from 'discord.js';
import { configStore } from '../config/configStore.js';
import { logger } from '../utils/logger.js';
import { waitForResponse } from '../utils/waitForResponse.js';
import { createVerificationComponents } from '../verification/createVerificationEmbed.js';

export async function handleConfigInteraction(
  interaction: StringSelectMenuInteraction | ButtonInteraction
) {
  const guildId = interaction.guildId;
  if (!guildId || !interaction.guild || !interaction.channel) return;

  try {
    const channel = interaction.channel;
    const user = interaction.user;

    if (interaction.isStringSelectMenu()) {
      const selected = interaction.values[0];
      await interaction.reply({ content: '🕐 Aguardando resposta...', ephemeral: true });

      switch (selected) {
        case 'config_role': {
          const roleName = await waitForResponse(channel, user, '👤 Qual o nome exato do cargo de verificação?');
          if (!roleName) return;
          configStore.set(guildId, { roleName });
          return interaction.followUp({ content: `✅ Cargo atualizado para **${roleName}**.`, ephemeral: true });
        }

        case 'config_message': {
          const msg = await waitForResponse(channel, user, '📨 Qual a nova mensagem de boas-vindas?');
          if (!msg) return;
          configStore.set(guildId, { message: msg });
          return interaction.followUp({ content: '✅ Mensagem atualizada com sucesso.', ephemeral: true });
        }

        case 'config_bots': {
          const response = await waitForResponse(channel, user, '🤖 Permitir bots se verificarem? Responda com `sim` ou `não`.');
          if (!response) return;
          const allowBots = ['sim', 's', 'yes', 'y'].includes(response.toLowerCase());
          configStore.set(guildId, { allowBots });
          return interaction.followUp({ content: `✅ Bots ${allowBots ? 'agora podem' : 'não podem mais'} se verificar.`, ephemeral: true });
        }

        case 'config_buttons': {
          return interaction.followUp({ content: '🔘 Personalização de botões ainda será implementada!', ephemeral: true });
        }

        default:
          return interaction.followUp({ content: '❌ Opção inválida.', ephemeral: true });
      }
    }

    if (interaction.isButton()) {
      switch (interaction.customId) {
        case 'config_save':
          return interaction.reply({ content: '💾 Configurações salvas com sucesso!', ephemeral: true });

        case 'config_reset':
          configStore.reset(guildId);
          return interaction.reply({ content: '🔁 Configurações restauradas para os padrões.', ephemeral: true });

        case 'config_publish': {
          const { embed, components } = createVerificationComponents(guildId);
          await interaction.channel.send({ embeds: [embed], components });
          return interaction.reply({ content: '📤 Embed de verificação enviado com sucesso!', ephemeral: true });
        }

        default:
          return;
      }
    }
  } catch (error) {
    logger.error(`Erro na configuração (${guildId}): ${String(error)}`);
    if (interaction.isRepliable()) {
      return interaction.reply({ content: '❌ Erro ao processar a configuração.', ephemeral: true });
    }
  }
}
