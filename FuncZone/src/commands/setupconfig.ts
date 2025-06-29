import { EmbedBuilder } from 'discord.js';
import { createConfigUI } from '../components/configUI.js';
import type { Command } from '../types';
import { colors } from '../../assets/colors.js';

const command: Command = {
  name: 'setupconfig',
  description: 'Abre o painel de configuração avançada da verificação.',
  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages', 'ViewChannel'],
  deleteMessage: true,

  async execute(message, args, client) {
    const embed = new EmbedBuilder()
      .setTitle('⚙️ Painel de Configuração de Verificação')
      .setColor(colors.blue)
      .setDescription([
        '👤 Escolha o canal onde o embed será publicado;',
        '✏️ Clique em **Editar campos** para definir cargo, mensagem e bots;',
        '🚀 Finalize com **Enviar verificação** para publicar o painel.'
      ].join('\n'))
      .setFooter({ text: 'FuncZone - Configuração Avançada' });

    const components = createConfigUI();

    return message.channel.send({ embeds: [embed], components });
  }
};

export default command;
