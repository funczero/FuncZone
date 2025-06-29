import { Client } from 'discord.js';
import { loadEvents } from './loadEvents';

export async function startBot() {
  const client = new Client({ intents: [...] });
  await loadEvents(client);
  await client.login(process.env.DISCORD_TOKEN);
}
