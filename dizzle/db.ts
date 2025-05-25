import { drizzle } from 'drizzle-orm/postgres-js';

export const db = drizzle({
  connection: {
    host: 'localhost',
    port: 5432,
    database: 'dev_database',
    username: 'admin',
    password: 'admin',
  },
});
