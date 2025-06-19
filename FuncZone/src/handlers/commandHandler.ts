import { BotClient } from '../client/BotClient';
import { readdirSync } from 'fs';
import { join } from 'path';
import { logger } from '../logger/logger';

export async function loadCommands(client: BotClient) {
  const folders = readdirSync(join(__dirname, '..', 'modules'));

  for (const folder of folders) {
    const commandFiles = readdirSync(join(__dirname, '..', 'modules', folder)).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = await import(`../modules/${folder}/${file}`);
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
        logger.info(`Comando carregado: ${command.data.name}`);
      }
    }
  }
}
