import type { Message } from 'discord.js';

export interface Command {
  
  name: string;
  description?: string;
  aliases?: string[];
  adminOnly?: boolean;
  permissions?: string[];
  cooldown?: number;

  execute: (message: Message, args: string[]) => Promise<unknown> | void;
}
