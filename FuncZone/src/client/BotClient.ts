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
  /** Registro interno dos comandos disponíveis no bot */
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
   * Autentica e conecta o cliente ao Discord
   * @param token Token de acesso fornecido via variável de ambiente
   */
  public async start(token: string): Promise<void> {
    try {
      logger.info('Conectando ao gateway do Discord...');
      await this.login(token);
    } catch (error) {
      const message = error instanceof Error ? error.stack : String(error);
      logger.fatal(`Erro de login no Discord:\n${message}`);
      process.exit(1);
    }
  }
}
