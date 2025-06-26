import fs from 'node:fs';
import path from 'node:path';
import { BotClient } from '../client/BotClient';
import type { Command } from '../types';
import { logger } from '../utils/logger';

export async function loadCommands(client: BotClient) {
  const commandsPath = path.join(__dirname, '../commands');
  const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    try {
      const command: Command = await import(filePath);
      if (command.name && typeof command.execute === 'function') {
        client.commands.set(command.name, command);
        logger.info(`Comando carregado: ${command.name}`);
      }
    } catch (err) {
      logger.warn(`⚠️ Não foi possível carregar o comando ${file}: ${err}`);
    }
  }
}
