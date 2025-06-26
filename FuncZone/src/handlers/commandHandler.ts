import { Collection, Client, Message } from 'discord.js';
import { readdirSync } from 'fs';
import path from 'path';

type Command = {
  name: string;
  description?: string;
  aliases?: string[];
  execute: (message: Message, args: string[]) => any;
};

export const commands = new Collection<string, Command>();
export const aliases = new Collection<string, string>();

export function loadCommands(client: Client) {
  const commandsPath = path.join(__dirname, '..', 'commands');
  const categories = readdirSync(commandsPath);

  for (const category of categories) {
    const commandFiles = readdirSync(path.join(commandsPath, category)).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

    for (const file of commandFiles) {
      const commandPath = path.join(commandsPath, category, file);
      import(commandPath).then((cmd) => {
        const command: Command = cmd.default;
        if (!command?.name || !command.execute) return;

        commands.set(command.name, command);
        if (command.aliases) {
          for (const alias of command.aliases) {
            aliases.set(alias, command.name);
          }
        }
      });
    }
  }
}
