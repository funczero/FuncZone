import { Message, EmbedBuilder } from 'discord.js';
import { colors } from '../assets/colors';
import { icons } from '../assets/icons';
import { createVerifyButton } from '../components/verifyButton';
import type { Command } from '../types';

const command: Command = {
  name: 'setupverify',
  description: 'Envia o embed de verificação no canal atual.',
  userPermissions: ['Administrator'],
  botPermissions: ['SendMessages'],
  deleteMessage: true,

  async execute(message: Message) {
    const embed = new EmbedBuilder()
      .setColor(colors.blue)
      .setAuthor({
        name: 'Verificação necessária',
        iconURL: icons.icon_attention
      })
      .setDescription('Clique no botão abaixo para se verificar e receber acesso ao servidor.')
      .setTimestamp();

    const buttonRow = createVerifyButton();
    return message.channel.send({ embeds: [embed], components: [buttonRow] });
  }
};

export default command;
