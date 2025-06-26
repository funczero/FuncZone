import { readdirSync } from 'fs';
import path from 'path';
import { BotClient } from '../client/BotClient';

export async function loadEvents(client: BotClient) {
  const eventsPath = path.join(__dirname, '..', 'events');
  const eventFiles = readdirSync(eventsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of eventFiles) {
    const filePath = path.join(eventsPath, file);
    const event = await import(filePath);
    const eventName = file.replace(/\.(ts|js)$/, '');

    if (eventName === 'ready') {
      client.once('ready', (...args) => event.default(...args, client));
    } else {
      client.on(eventName, (...args) => event.default(...args, client));
    }
  }
}
