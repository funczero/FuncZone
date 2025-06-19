import { Command } from '../../../types/Bot';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';
import { logger } from '../../../logger/logger';

function getAllCommandFiles(dir: string): string[] {
  let results: string[] = [];
  const list = readdirSync(dir);

  for (const file of list) {
    const fullPath = join(dir, file);
    const stat = statSync(fullPath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getAllCommandFiles(fullPath));
    } else if (file.endsWith('.ts') || file.endsWith('.js')) {
      results.push(fullPath);
    }
  }

  return results;
}

export const data = new SlashCommandBuilder()
  .setName('reload')
  .setDescription('Recarrega comandos dinamicamente')
  .addStringOption(option =>
    option.setName('comando')
      .setDescription('Nome do comando a recarregar (ou deixe vazio para recarregar todos)')
      .setRequired(false)
  );

export const execute = async (interaction: ChatInputCommandInteraction) => {
  const client = interaction.client as any;
  const commandName = interaction.options.getString('comando');

  try {
    if (interaction.user.id !== process.env.OWNER_ID) {
      return interaction.reply({ content: '❌ Apenas o dono pode usar este comando.', ephemeral: true });
    }

    const basePath = join(__dirname, '..', '..');
    const commandFiles = getAllCommandFiles(join(basePath, 'commands'));

    if (commandName) {
      let found = false;

      for (const filePath of commandFiles) {
        if (filePath.endsWith(`${commandName}.ts`) || filePath.endsWith(`${commandName}.js`)) {
          delete require.cache[require.resolve(filePath)];
          const command = await import(filePath);
          client.commands.set(command.data.name, command);
          found = true;
          await interaction.reply(`✅ Comando \`${commandName}\` recarregado com sucesso.`);
          logger.info(`🔁 Comando '${commandName}' recarregado manualmente.`);
          break;
        }
      }

      if (!found) {
        await interaction.reply(`❌ Comando \`${commandName}\` não encontrado.`);
      }
    } else {
      client.commands.clear();

      for (const filePath of commandFiles) {
        delete require.cache[require.resolve(filePath)];
        const command = await import(filePath);
        client.commands.set(command.data.name, command);
        logger.info(`♻️ Recarregado: ${command.data.name}`);
      }

      await interaction.reply(`✅ Todos os comandos foram recarregados com sucesso.`);
    }
  } catch (error) {
    logger.error(`Erro ao recarregar comandos: ${error}`);
    await interaction.reply({ content: '❌ Ocorreu um erro ao recarregar os comandos.', ephemeral: true });
  }
};

export default { data, execute } as Command;
