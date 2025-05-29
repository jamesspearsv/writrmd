import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';

async function main() {
  if (!process.env.PG_URL) throw new Error('No database url!');

  const db = drizzle(process.env.PG_URL);

  try {
    await migrate(db, { migrationsFolder: './drizzle' });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
}

main();
