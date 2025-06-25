import { PresenceData, ActivityType } from 'discord.js';

/**
 * Define o status inicial do bot
 */
export const presenceConfig: PresenceData = {
  status: 'dnd',
  activities: [
    {
      name: 'FuncZone',
      type: ActivityType.Playing
    }
  ]
};
