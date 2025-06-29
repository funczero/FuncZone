import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { Client } from 'discord.js';

// Emula __dirname no contexto ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function loadEvents(client: Client): Promise<void> {
  const eventsDir = path.resolve(__dirname, '../events');
  const files = await fs.readdir(eventsDir);

  for (const file of files) {
    if (!file.endsWith('.ts') && !file.endsWith('.js')) continue;

    const filePath = path.join(eventsDir, file);
    const fileUrl = pathToFileURL(filePath).href;

    try {
      const event = await import(fileUrl);
      const eventName = path.basename(file).split('.')[0];
      client.on(eventName, event.default);
    } catch (error) {
      console.error(`Erro ao carregar evento ${file}:`, error);
    }
  }
}
