import { config } from 'dotenv';
config();

export const botConfig = {
  prefix: process.env.PREFIX || '.',
  token: process.env.DISCORD_TOKEN!,
  ownerId: process.env.OWNER_ID || '',
  supportGuildId: process.env.SUPPORT_GUILD_ID || '',

  links: {
    rules: process.env.RULES_URL!,
    support: process.env.SUPPORT_URL!,
    announcements: process.env.ANNOUNCEMENTS_URL!,
  },

  channels: {
    welcome: process.env.WELCOME_CHANNEL_ID!,
    booster: process.env.BOOST_CHANNEL_ID!,
  },

  timezone: 'America/Sao_Paulo',
};
