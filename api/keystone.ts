import { config } from '@keystone-6/core';
import { lists } from './schema';
import { insertSeedData } from './seed';

export default config({
  db: {
    provider: "sqlite",
    url: process.env.DATABASE_URL || "file:./keystone.db",
    onConnect: async (context) => {
       await insertSeedData(context);
    },
  },

  lists,

  ui: {
    isAccessAllowed: () => true,
  },

  server: {
    port: 3000,
    cors: {
      origin: ["http://localhost:3001"],
      credentials: true,
    },
  },
});