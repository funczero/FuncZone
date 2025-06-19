import 'dotenv/config';

export const config = {
  TOKEN: process.env.TOKEN as string,
  PREFIX: process.env.PREFIX || '.',
};
