import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './app/db/schema.ts',
  dbCredentials: {
    url: process.env.PG_URL!,
    ssl: false,
  },
});
