import { PresenceData, ActivityType } from 'discord.js';

/**
 * Define o status inicial do FuncZone
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
