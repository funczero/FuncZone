function getEnvVar(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Variável de ambiente '${key}' não está definida.`);
  }
  return value;
}

export const env = {
  discordToken: getEnvVar('DISCORD_TOKEN'),
  welcomeChannelId: getEnvVar('WELCOME_CHANNEL_ID'),
  boostChannelId: getEnvVar('BOOST_CHANNEL_ID'),
  rulesUrl: getEnvVar('RULES_URL'),
  announcementsUrl: getEnvVar('ANNOUNCEMENTS_URL'),
  supportUrl: getEnvVar('SUPPORT_URL'),
  prefix: getEnvVar('PREFIX'),
  ownerId: getEnvVar('OWNER_ID'),
  supportGuildId: getEnvVar('SUPPORT_GUILD_ID')
};
