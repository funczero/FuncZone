import {
  ButtonInteraction,
  EmbedBuilder
} from 'discord.js';
import { colors } from '../../assets/colors';
import { buildHelpButtons } from '../components/helpButtons';
import { paginateCommands } from '../utils/paginateCommands';
import { BotClient } from '../client/BotClient';

const state = new Map<string, number>(); // map por mensagem

export async function handleHelpNavigation(interaction: ButtonInteraction, client: BotClient) {
  const messageId = interaction.message.id;
  const totalPages = paginateCommands(Array.from(client.commands.values())).length;
  const currentPage = state.get(messageId) ?? 0;

  const next = interaction.customId === 'help_next';
  const newPage = next
    ? Math.min(currentPage + 1, totalPages - 1)
    : Math.max(currentPage - 1, 0);

  const comandos = paginateCommands(Array.from(client.commands.values()));
  const embed = new EmbedBuilder()
    .setTitle('📚 Lista de comandos')
    .setColor(colors.blue)
    .setDescription(
      comandos[newPage]
        .map(c => `> \`${c.name}\` → ${c.description}`)
        .join('\n')
    )
    .setFooter({ text: `Página ${newPage + 1} de ${comandos.length}` });

  state.set(messageId, newPage);

  return interaction.update({
    embeds: [embed],
    components: [buildHelpButtons(newPage, totalPages)]
  });
}
