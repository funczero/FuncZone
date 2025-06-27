import { Client } from 'discord.js';
import { presenceConfig } from '@config/presence';
import { logger } from '@utils/logger';

export default async function onReady(client: Client): Promise<void> {
  client.user?.setPresence(presenceConfig);
}
