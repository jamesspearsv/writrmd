import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

/*
TODO: Add logic to check for new migrations
- Don't attempt to apply migrations if there are now new migrations
- Check the _drizzleMigrations table in the database
*/

async function main() {
  if (!process.env.POSTGRES_URL) throw new Error('No database url!');

  // Establish connection to pg client
  console.log('Connecting to: ', process.env.POSTGRES_URL);
  const client = postgres(process.env.POSTGRES_URL, { max: 1 });
  const db = drizzle(client);

  // Attempt to apply migrations
  try {
    await migrate(db, { migrationsFolder: './migrations' });
    await client.end();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  process.exit(0);
}

main();
