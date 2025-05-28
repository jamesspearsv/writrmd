import { drizzle } from 'drizzle-orm/postgres-js';

export const db = drizzle(process.env.PG_URL!);
