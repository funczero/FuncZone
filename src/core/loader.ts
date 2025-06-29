import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { loadEvents } from './loadEvents';
import { setBotPresence } from './setPresence';
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

  // Define presença após evento 'ready'
  client.once('ready', () => {
    setBotPresence(client);
    log.info(`FuncZone pronto como ${client.user?.tag}`);
  });

  try {
    const token = process.env.DISCORD_TOKEN;
    if (!token) throw new Error('Token do Discord não encontrado em process.env.DISCORD_TOKEN');

    await client.login(token);
    log.info('Autenticação realizada com sucesso.');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    log.fatal(`Erro ao autenticar o client Discord: ${message}`);
  }
}
