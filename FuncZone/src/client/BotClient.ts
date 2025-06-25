import { Client, GatewayIntentBits } from 'discord.js';

export class BotClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
      ],
    });
  }

  async start(token: string) {
    await this.login(token);
  }
}
