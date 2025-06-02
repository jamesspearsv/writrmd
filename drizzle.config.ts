import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './app/db/schema.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    url: process.env.POSTGRES_URL || 'postgresql://localhost:5432',
    ssl: false,
  },
});
