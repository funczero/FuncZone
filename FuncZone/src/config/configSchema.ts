export interface GuildVerificationConfig {
  roleName: string;
  message: string;
  allowBots: boolean;
  buttons: {
    label: string;
    customId: string;
    style: 'Primary' | 'Secondary' | 'Success' | 'Danger';
  }[];
}
