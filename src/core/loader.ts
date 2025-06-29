import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { setBotPresence } from './setPresence';
import { loadEvents } from './loadEvents';
import { log } from '../utils/logger';

/**
 * Inicializa o bot do Discord com intents, eventos e autenticação.
 */
export async function startBot(): Promise<void> {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages
    ],
    partials: [Partials.User, Partials.GuildMember]
  });

  log.info('Inicializando client Discord...');

  try {
    await loadEvents(client);
    log.info('Eventos carregados e vinculados com sucesso.');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    log.fatal(`Falha ao carregar eventos: ${message}`);
  }

  try {
    const token = process.env.DISCORD_TOKEN;
    if (!token) throw new Error('Token do Discord não encontrado em process.env.DISCORD_TOKEN');

    await client.login(token);
    log.info('Client autenticado com sucesso. FuncZone está online!');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    log.fatal(`Erro ao autenticar o client Discord: ${message}`);
  }
}
