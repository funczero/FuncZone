import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection
} from 'discord.js';
import { logger } from '../utils/logger';
import type { Command } from '../types';

/**
 * Cliente estendido com suporte a comandos personalizados.
 */
export class BotClient extends Client {
  /** Registro dos comandos do bot */
  public commands: Collection<string, Command>;

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
      ],
      partials: [Partials.GuildMember]
    });

    this.commands = new Collection();
  }

  /**
   * Autentica e conecta o bot ao Discord
   * @param token Token de autenticação (via .env)
   */
  public async start(token: string): Promise<void> {
    try {
      logger.info('Conectando ao Discord...');
      await this.login(token);
      logger.success(`Autenticado como ${this.user?.tag}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      logger.fatal(`Falha na autenticação: ${message}`);
      process.exit(1);
    }
  }
}
