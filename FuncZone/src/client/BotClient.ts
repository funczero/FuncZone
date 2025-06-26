import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { logger } from '../utils/logger';

/**
 * Classe personalizada do cliente do Discord
 * Estende o Client padrão para centralizar configuração do bot
 */
export class BotClient extends Client {
  constructor() {
    super({
      // Intents mínimos e seguros para operação inicial
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
      ],
      // Permite manipular dados parciais como membros offline
      partials: [
        Partials.GuildMember,
      ],
    });
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
