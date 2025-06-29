import {
  StringSelectMenuInteraction,
  ButtonInteraction,
  TextBasedChannel
} from 'discord.js';
import { configStore } from '../config/configStore.js';
import { logger } from '../utils/logger.js';
import { waitForResponse } from '../utils/waitForResponse.js';
import { createVerificationComponents } from '../verification/createVerificationEmbed.js';

export async function handleConfigInteraction(
  interaction: StringSelectMenuInteraction | ButtonInteraction
) {
  const guildId = interaction.guildId;
  if (!guildId || !interaction.guild || !interaction.channel?.isTextBased()) return;

  try {
    const channel = interaction.channel as TextBasedChannel;
    const user = interaction.user;

    if (interaction.isStringSelectMenu()) {
      const selected = interaction.values[0];
      await interaction.deferReply({ ephemeral: true });

      switch (selected) {
        case 'config_role': {
          const roleName = await waitForResponse(channel, user, '👤 Qual o nome exato do cargo de verificação?');
          if (!roleName) return interaction.editReply({ content: '⏹️ Operação cancelada.' });

          configStore.set(guildId, { roleName });
          return interaction.editReply({ content: `✅ Cargo atualizado para **${roleName}**.` });
        }

        case 'config_message': {
          const msg = await waitForResponse(channel, user, '📨 Qual a nova mensagem de boas-vindas?');
          if (!msg) return interaction.editReply({ content: '⏹️ Operação cancelada.' });

          configStore.set(guildId, { message: msg });
          return interaction.editReply({ content: '✅ Mensagem atualizada com sucesso.' });
        }

        case 'config_bots': {
          const response = await waitForResponse(channel, user, '🤖 Permitir bots se verificarem? Responda com `sim` ou `não`.');
          if (!response) return interaction.editReply({ content: '⏹️ Operação cancelada.' });

          const allowBots = ['sim', 's', 'yes', 'y'].includes(response.toLowerCase());
          configStore.set(guildId, { allowBots });
          return interaction.editReply({
            content: `✅ Bots ${allowBots ? 'agora podem' : 'não podem mais'} se verificar.`
          });
        }

        case 'config_buttons': {
          return interaction.editReply({ content: '🔘 Personalização de botões ainda será implementada!' });
        }

        default:
          return interaction.editReply({ content: '❌ Opção inválida.' });
      }
    }

    if (interaction.isButton()) {
      switch (interaction.customId) {
        case 'config_save':
          return interaction.reply({ content: '💾 As configurações já são salvas automaticamente!', ephemeral: true });

        case 'config_reset':
          configStore.reset(guildId);
          return interaction.reply({ content: '🔁 Configurações restauradas para os padrões.', ephemeral: true });

        case 'config_publish': {
          const { embed, components } = createVerificationComponents(guildId);

          if (!components[0]?.components.length) {
            return interaction.reply({
              content: '⚠️ Nenhum botão configurado. Use o painel para adicioná-los.',
              ephemeral: true
            });
          }

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
      return interaction.reply({
        content: '❌ Ocorreu um erro ao processar a configuração. Verifique os logs.',
        ephemeral: true
      });
    }
  }
}
