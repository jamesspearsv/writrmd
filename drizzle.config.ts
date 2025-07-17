import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './app/db/schema.ts',
  out: './drizzle/migrations',
  dbCredentials: {
    url: 'postgres://admin:admin@media.jspears.me:5432/admin_database',
    ssl: false,
  },
});
