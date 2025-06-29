import type { Message, TextChannel, User } from 'discord.js';

export async function waitForResponse(
  channel: TextChannel,
  user: User,
  question: string,
  timeout = 15000
): Promise<string | null> {
  const prompt = await channel.send(`✏️ ${question}`);

  try {
    const collected = await channel.awaitMessages({
      filter: msg => msg.author.id === user.id,
      max: 1,
      time: timeout,
      errors: ['time']
    });

    await prompt.delete().catch(() => {});
    await collected.first()?.delete().catch(() => {});
    return collected.first()?.content ?? null;
  } catch {
    await prompt.edit('⏰ Tempo esgotado. Tente novamente.').then(msg => {
      setTimeout(() => msg.delete().catch(() => {}), 5000);
    });
    return null;
  }
}
