import type { GuildVerificationConfig } from './configSchema.js';

export const defaultConfig: GuildVerificationConfig = {
  roleName: 'Verificado',
  message: 'Clique para se verificar!',
  allowBots: false
};
