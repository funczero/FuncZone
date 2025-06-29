import { Client } from 'discord.js';
import { log } from '../utils/logger';

export function setBotPresence(client: Client): void {
  client.user?.setPresence({
    status: 'dnd',
    activities: [
      {
        name: 'FuncZone',
        type: 0
      }
    ]
  });

  log.info('🎮 Presença definida: Não perturbe | Jogando FuncZone');
}
