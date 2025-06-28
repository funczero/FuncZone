import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'url';
import { BotClient } from '@client/BotClient';
import type { Command } from '@types';
import { logger } from '@utils/logger';

/**
 * Carrega recursivamente todos os comandos da pasta /commands
 */
export async function loadCommands(client: BotClient): Promise<void> {
  const commandsDir = path.resolve(__dirname, '../commands');

  async function loadDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        await loadDirectory(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.js')) {
        try {
          const commandModule = await import(pathToFileURL(filePath).href);
          const command: Command = commandModule.default ?? commandModule;

          if (
            !command ||
            typeof command.name !== 'string' ||
            typeof command.execute !== 'function'
          ) {
            logger.warn(`Arquivo inválido ignorado: ${filePath}`);
            continue;
          }

          if (client.commands.has(command.name)) {
            logger.warn(`Comando duplicado ignorado: ${command.name}`);
            continue;
          }

          client.commands.set(command.name, command);
          logger.info(`Comando carregado: ${command.name}`);
        } catch (error) {
          logger.error(`Erro ao carregar o comando ${file}: ${error}`);
        }
      }
    }
  }

  await loadDirectory(commandsDir);
}
