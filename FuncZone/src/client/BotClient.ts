import { Client, Collection, GatewayIntentBits } from 'discord.js';
import type { Command } from '../types/Bot';

export class BotClient extends Client {
  public commands = new Collection<string, Command>();

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }
}
