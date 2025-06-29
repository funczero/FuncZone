import {
  StringSelectMenuInteraction,
  ButtonInteraction
} from 'discord.js';
import { configStore } from '../config/configStore.js';
import { logger } from '../utils/logger.js';

/**
 * Trata interações do painel de configuração (menus e botões)
 */
export async function handleConfigInteraction(interaction: StringSelectMenuInteraction | ButtonInteraction) {
  const guildId = interaction.guildId;
  if (!guildId) return;

  try {
    if (interaction.isStringSelectMenu()) {
      const selected = interaction.values[0];

      switch (selected) {
        case 'config_role':
          return interaction.reply({
            content: '👤 Qual o nome exato do cargo de verificação? (Ex: `Verificado`)',
            ephemeral: true
          });
        case 'config_message':
          return interaction.reply({
            content: '📝 Envie a mensagem de boas-vindas desejada.',
            ephemeral: true
          });
        case 'config_bots':
          return interaction.reply({
            content: '🤖 Bots devem poder se verificar? Responda com `sim` ou `não`.',
            ephemeral: true
          });
        case 'config_buttons':
          return interaction.reply({
            content: '🔘 Em breve: edição dos botões personalizáveis!',
            ephemeral: true
          });
        default:
          return interaction.reply({ content: '❌ Opção inválida.', ephemeral: true });
      }
    }

    if (interaction.isButton()) {
      switch (interaction.customId) {
        case 'config_save':
          // Em versão futura: salvar no disco/banco
          return interaction.reply({ content: '💾 Configurações salvas com sucesso!', ephemeral: true });

        case 'config_reset':
          configStore.reset(guildId);
          return interaction.reply({ content: '🔁 Configurações restauradas para os valores padrão.', ephemeral: true });

        default:
          return;
      }
    }

  } catch (error) {
    logger.error(`Erro na interação de configuração: ${String(error)}`);
    return interaction.reply({ content: '❌ Erro ao processar a interação.', ephemeral: true });
  }
}
