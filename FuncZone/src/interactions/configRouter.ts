import {
  ChannelSelectMenuInteraction,
  ButtonInteraction,
  TextBasedChannel
} from 'discord.js';
import { configStore } from '../config/configStore.js';
import { logger } from '../utils/logger.js';
import { createVerificationComponents } from '../verification/createVerificationEmbed.js';
import { createConfigModal } from '../ui/createConfigModal.js';

type ConfigInteraction = ChannelSelectMenuInteraction | ButtonInteraction;

export async function handleConfigInteraction(interaction: ConfigInteraction) {
  const guildId = interaction.guildId;
  if (!guildId || !interaction.guild || !interaction.channel?.isTextBased()) return;

  try {
    // 📡 Seleção de canal
    if (interaction.isChannelSelectMenu() && interaction.customId === 'config_channel') {
      const selectedChannelId = interaction.values[0];
      configStore.set(guildId, { channelId: selectedChannelId });

      return interaction.reply({
        content: `📺 Canal de verificação definido: <#${selectedChannelId}>`,
        ephemeral: true
      });
    }

    // 🔘 Botões do painel
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case 'config_edit_fields': {
          return interaction.showModal(createConfigModal());
        }

        case 'config_reset': {
          configStore.reset(guildId);
          return interaction.reply({
            content: '🔁 Configurações restauradas para os padrões.',
            ephemeral: true
          });
        }

        case 'config_save': {
          return interaction.reply({
            content: '💾 As configurações são salvas automaticamente a cada alteração!',
            ephemeral: true
          });
        }

        case 'config_publish': {
          const config = configStore.get(guildId);

          if (!config.channelId) {
            return interaction.reply({
              content: '⚠️ Canal de verificação não definido!',
              ephemeral: true
            });
          }

          const targetChannel = interaction.guild.channels.cache.get(config.channelId);
          if (!targetChannel?.isTextBased()) {
            return interaction.reply({
              content: '❌ O canal selecionado não é válido ou acessível.',
              ephemeral: true
            });
          }

          const { embed, components } = createVerificationComponents(guildId);

          if (!components[0]?.components.length) {
            return interaction.reply({
              content: '⚠️ Nenhum botão configurado. Use o painel para adicioná-los.',
              ephemeral: true
            });
          }

          await targetChannel.send({ embeds: [embed], components });
          return interaction.reply({
            content: `📤 Painel de verificação enviado para <#${config.channelId}>`,
            ephemeral: true
          });
        }

        default:
          return;
      }
    }
  } catch (error) {
    logger.error(`Erro na configuração (${guildId}): ${String(error)}`);
    if (interaction.isRepliable()) {
      return interaction.reply({
        content: '❌ Ocorreu um erro ao processar a configuração.',
        ephemeral: true
      });
    }
  }
}
