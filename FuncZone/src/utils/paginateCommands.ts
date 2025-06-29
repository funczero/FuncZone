import type { Command } from '../types';

export function paginateCommands(commands: Command[], perPage = 6): Command[][] {
  const pages: Command[][] = [];

  for (let i = 0; i < commands.length; i += perPage) {
    pages.push(commands.slice(i, i + perPage));
  }

  return pages;
}
