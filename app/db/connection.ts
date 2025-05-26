import { drizzle } from 'drizzle-orm/postgres-js';

// TODO: add db connection env vars

export const db = drizzle(process.env.PG_URL!);
