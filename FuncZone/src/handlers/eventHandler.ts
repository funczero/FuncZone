import { BotClient } from '../client/BotClient';
import { readdirSync } from 'fs';
import { join } from 'path';
import { logger } from '../logger/logger';

export async function loadEvents(client: BotClient) {
  const eventFiles = readdirSync(join(__dirname, '..', 'events')).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const event = await import(`../events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.default.bind(null, client));
    logger.info(`📂 Evento carregado: ${eventName}`);
  }
}
