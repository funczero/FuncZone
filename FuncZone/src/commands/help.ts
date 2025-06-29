import { Message, EmbedBuilder } from 'discord.js';
import { colors } from '../../assets/colors';
import { buildHelpButtons } from '../components/helpButtons';
import { paginateCommands } from '../utils/paginateCommands';
import type { Command } from '../types';

const command: Command = {
  name: 'help',
  description: 'Mostra a lista de comandos disponíveis.',
  usage: '.help',
  botPermissions: ['SendMessages'],

  async execute(message, args, client) {
    const comandos = Array.from(client.commands.values());
    const pages = paginateCommands(comandos);
    const page = 0;

    const embed = new EmbedBuilder()
      .setTitle('📚 Lista de comandos')
      .setColor(colors.blue)
      .setDescription(
        pages[page]
          .map(c => `> \`${c.name}\` → ${c.description}`)
          .join('\n')
      )
      .setFooter({ text: `Página ${page + 1} de ${pages.length}` });

    return message.channel.send({
      embeds: [embed],
      components: [buildHelpButtons(page, pages.length)]
    });
  }
};

export default command;
      
