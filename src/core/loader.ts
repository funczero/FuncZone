import { Client, GatewayIntentBits, Partials } from 'discord.js';
import { loadEvents } from './loadEvents';
import { log } from '../utils/logger';

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
  } catch (error) {
    log.fatal(`Falha ao carregar eventos: ${error instanceof Error ? error.message : error}`);
  }

  try {
    await client.login(process.env.DISCORD_TOKEN);
    log.info('Client autenticado com sucesso. FuncZone está online!');
  } catch (error) {
    log.fatal(`Erro ao autenticar o client Discord: ${error instanceof Error ? error.message : error}`);
  }
}
