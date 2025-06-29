import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'url';
import { BotClient } from '../client/BotClient.js';
import { logger } from '../utils/logger.js';

// Compatibilidade com ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadEvents(client: BotClient): Promise<void> {
  const eventsDir = path.resolve(__dirname, '../events');

  async function loadDirectory(dir: string) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        await loadDirectory(filePath);
      } else if (file.endsWith('.ts') || file.endsWith('.js')) {
        try {
          const eventModule = await import(pathToFileURL(filePath).href);
          const event = eventModule.default;

          // Validação do evento moderno: objeto com 'name' e 'execute'
          if (!event || typeof event.name !== 'string' || typeof event.execute !== 'function') {
            logger.warn(`Evento ignorado (formato inválido): ${filePath}`);
            continue;
          }

          // Registrar o evento usando once ou on conforme o nome
          const handler = (...args: unknown[]) => event.execute(...args, client);
          const isOnce = ['ready', 'shardReady'].includes(event.name);

          isOnce
            ? client.once(event.name, handler)
            : client.on(event.name, handler);

          logger.info(`Evento carregado: ${event.name}`);
        } catch (error) {
          logger.error(`Erro ao carregar evento ${file}: ${error}`);
        }
      }
    }
  }

  await loadDirectory(eventsDir);
}
