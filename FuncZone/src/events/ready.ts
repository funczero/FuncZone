import { BotClient } from '../client/BotClient';

export default (client: BotClient) => {
  console.log(`[FuncZone] Logado como ${client.user?.tag}`);
};
