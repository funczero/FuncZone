import { BotClient } from '../client/BotClient';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';
import { logger } from '../logger/logger';

// !Função recursiva para varrer subpastas
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

export async function loadCommands(client: BotClient) {
  const commandFiles = getAllCommandFiles(join(__dirname, '..', 'modules', 'commands'));

  for (const filePath of commandFiles) {
    try {
      const command = await import(filePath);
      if (command.data && command.execute) {
        client.commands.set(command.data.name, command);
        logger.info(`Comando carregado: ${command.data.name}`);
      }
    } catch (error) {
      logger.warn(`Erro ao carregar comando em ${filePath}: ${error}`);
    }
  }
}
