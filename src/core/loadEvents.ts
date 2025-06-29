import { Client } from 'discord.js';
import fs from 'fs';
import path from 'path';

export async function loadEvents(client: Client) {
  const eventFiles = fs.readdirSync(path.join(__dirname, '../events'));
  for (const file of eventFiles) {
    const event = await import(`../events/${file}`);
    const eventName = file.split('.')[0];
    client.on(eventName, event.default);
  }
}
