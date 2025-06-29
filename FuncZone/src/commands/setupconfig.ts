import { Message, EmbedBuilder } from 'discord.js';
import { createConfigUI } from '../components/configUI';
import type { Command } from '../types';
import { colors } from '../../assets/colors';

const command: Command = {
  name: 'setupconfig',
  description: 'Abre o painel de configuração de verificação.',
  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  deleteMessage: true,

  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setTitle('⚙️ Painel de Configuração de Verificação')
      .setColor(colors.blue)
      .setDescription('Utilize o menu abaixo para selecionar o que deseja personalizar.')
      .setFooter({ text: 'FuncZone - Configuração Avançada' });

    const components = createConfigUI();

    return message.channel.send({ embeds: [embed], components });
  }
};

export default command;
