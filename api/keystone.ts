import { config } from '@keystone-6/core';
import { lists } from './schema';
import { insertSeedData } from './seed';

export default config({
  db: {
    provider: 'sqlite',
    url: process.env.DATABASE_URL || 'file:./keystone.db',
    onConnect: async (context) => {
      await insertSeedData(context);
    },
  },
  lists,
  ui: {
    isAccessAllowed: () => true, // Pour le test, on autorise tout le monde
  },
  graphql: {
    cors: {
      origin: ['http://localhost:3001'], // Frontend Next.js
      credentials: true,
    },
  },
  server: {
    port: 3000,
  },
});
