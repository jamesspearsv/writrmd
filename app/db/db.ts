import { drizzle } from 'drizzle-orm/postgres-js';

// TODO: add db connection env vars

export const db = drizzle({
  connection: {
    host: 'media.jspears.me',
    port: 5432,
    database: 'admin_database',
    user: 'admin',
    password: 'admin',
  },
});
