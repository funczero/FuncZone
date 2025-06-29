import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { loadEvents } from './loadEvents';

export async function startBot() {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages
    ],
    partials: [Partials.User, Partials.GuildMember]
  });

  await loadEvents(client);
  await client.login(process.env.DISCORD_TOKEN);
}
