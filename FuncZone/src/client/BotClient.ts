import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} from 'discord.js';
import { logger } from '../utils/logger';
import type { Command } from '../types';

/**
 * Classe personalizada do cliente do Discord
 * Estende o Client padrão para centralizar configuração do bot
 */
export class BotClient extends Client {
  public commands: Collection<string, Command>;

  constructor() {
    super({
      // Intents mínimos e seguros para operação inicial
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      // Permite manipular dados parciais como membros offline
      partials: [Partials.GuildMember],
    });

    this.commands = new Collection();
  }

  /**
   * Inicia o login do bot com o token fornecido
   * @param token Token do Discord (via .env)
   */
  public async start(token: string): Promise<void> {
    try {
      logger.info('Iniciando login no Discord...');
      await this.login(token);
      logger.info('Login concluído com sucesso!');
    } catch (error) {
      logger.error(`Erro durante o login: ${(error as Error).message}`);
      process.exit(1);
    }
  }
}
