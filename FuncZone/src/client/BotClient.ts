import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { logger } from '../utils/logger';

export class BotClient extends Client {
  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
      ],
      partials: [Partials.GuildMember],
    });
  }

  /**
   * Inicia o login do bot com o token fornecido
   */
  public async start(token: string): Promise<void> {
    try {
      logger.info('Iniciando login...');
      await this.login(token);
    } catch (error) {
      logger.error(`Falha ao fazer login: ${(error as Error).message}`);
      process.exit(1);
    }
  }
}
