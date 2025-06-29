import type { GuildVerificationConfig } from './configSchema.js';
import { defaultConfig } from './defaults.js';

const configs = new Map<string, GuildVerificationConfig>();

export const configStore = {
  get(guildId: string): GuildVerificationConfig {
    return configs.get(guildId) ?? { ...defaultConfig };
  },

  set(guildId: string, newConfig: Partial<GuildVerificationConfig>) {
    const existing = configStore.get(guildId);
    configs.set(guildId, { ...existing, ...newConfig });
  },

  reset(guildId: string) {
    configs.set(guildId, { ...defaultConfig });
  },

  all(): Map<string, GuildVerificationConfig> {
    return configs;
  }
};
