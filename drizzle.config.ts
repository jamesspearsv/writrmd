import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './app/db/schema.ts',
  dbCredentials: {
    host: 'media.jspears.me',
    port: 5432,
    user: 'admin',
    password: 'admin',
    database: 'admin_database',
    ssl: false,
  },
});
