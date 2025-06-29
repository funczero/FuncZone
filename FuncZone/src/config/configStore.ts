import type { GuildVerificationConfig } from './configSchema.js';
import { defaultConfig } from './defaults.js';
import { readFileSync, writeFileSync, existsSync } from 'fs';

const CONFIG_PATH = './data/configs.json';
const configs = new Map<string, GuildVerificationConfig>();

// Carrega do disco ao iniciar
if (existsSync(CONFIG_PATH)) {
  const raw = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
  for (const [guildId, config] of Object.entries(raw)) {
    configs.set(guildId, config as GuildVerificationConfig);
  }
}

// Salva no disco
function saveToDisk() {
  const obj = Object.fromEntries(configs.entries());
  writeFileSync(CONFIG_PATH, JSON.stringify(obj, null, 2));
}

export const configStore = {
  get(guildId: string): GuildVerificationConfig {
    return configs.get(guildId) ?? { ...defaultConfig };
  },

  set(guildId: string, newConfig: Partial<GuildVerificationConfig>) {
    const current = configStore.get(guildId);
    const updated = { ...current, ...newConfig };
    configs.set(guildId, updated);
    saveToDisk();
  },

  reset(guildId: string) {
    configs.set(guildId, { ...defaultConfig });
    saveToDisk();
  },

  all(): Map<string, GuildVerificationConfig> {
    return configs;
  }
};
