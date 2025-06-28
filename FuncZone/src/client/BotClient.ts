import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} from 'discord.js';
import { logger } from '../utils/logger';
import type { Command } from '../types';

/**
 * Cliente estendido do Discord com estrutura personalizada para o bot.
 */
export class BotClient extends Client {
  /** Coleção de comandos carregados dinamicamente */
  public commands: Collection<string, Command>;

  constructor() {
    super({
      // Intents essenciais para bots modernos
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      // Permite lidar com dados parciais de membros
      partials: [Partials.GuildMember],
    });

    this.commands = new Collection();
  }

  /**
   * Inicia o bot com o token fornecido
   * @param token Token do bot (via .env)
   */
  public async start(token: string): Promise<void> {
    try {
      logger.info('Iniciando autenticação com o Discord...');
      await this.login(token);
      logger.info(`Bot autenticado como ${this.user?.tag}`);
    } catch (error) {
      logger.error(`Erro durante o login: ${(error as Error).message}`);
      process.exit(1);
    }
  }
}
