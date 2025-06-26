import fs from 'node:fs';
import path from 'node:path';
import { BotClient } from '../client/BotClient';

export async function loadCommands(client: BotClient) {
  client.commands = new Map();

  const commandFiles = fs
    .readdirSync(path.join(__dirname, '../commands'))
    .filter(file => file.endsWith('.ts') || file.endsWith('.js'));

  for (const file of commandFiles) {
    const command = await import(`../commands/${file}`);
    if (command.name && typeof command.execute === 'function') {
      client.commands.set(command.name, command);
    }
  }
}
