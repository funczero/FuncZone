import {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} from 'discord.js';
import { logger } from '../utils/logger';
import type { Command } from '../types';

/**
 * Classe personalizada do cliente do Discord.
 * Estende a classe padrão Client para centralizar lógica do bot.
 */
export class BotClient extends Client {
  /**
   * Coleção de comandos carregados dinamicamente
   */
  public commands: Collection<string, Command>;

  constructor() {
    super({
      // Intents mínimos recomendados para bots modernos
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
      // Permite lidar com membros que não foram totalmente carregados
      partials: [Partials.GuildMember],
    });

    this.commands = new Collection();
  }

  /**
   * Inicia o login do bot com o token fornecido
   * @param token Token do Discord (.env)
   */
  public async start(token: string): Promise<void> {
    try {
      logger.info('Iniciando autenticação no Discord...');
      await this.login(token);
      logger.info(`Bot autenticado com sucesso!`);
    } catch (error) {
      logger.error(`Erro ao autenticar: ${(error as Error).message}`);
      process.exit(1);
    }
  }
}
