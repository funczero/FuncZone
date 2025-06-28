import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'url';
import { BotClient } from '../client/BotClient.js';
import { logger } from '../utils/logger.js';

// Simular __dirname no ambiente ESM
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
          const handler = eventModule.default;

          if (typeof handler !== 'function') {
            logger.warn(`Evento ignorado (sem export default function): ${filePath}`);
            continue;
          }

          const eventName = path.basename(file).replace(/\.(ts|js)$/, '');

          if (eventName === 'ready') {
            client.once('ready', (...args) => handler(...args, client));
          } else {
            client.on(eventName, (...args) => handler(...args, client));
          }

          logger.info(`Evento carregado: ${eventName}`);
        } catch (error) {
          logger.error(`Erro ao carregar evento ${file}: ${error}`);
        }
      }
    }
  }

  await loadDirectory(eventsDir);
}
