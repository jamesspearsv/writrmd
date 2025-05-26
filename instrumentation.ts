import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from '@/app/db/connection';

export async function register() {
  console.log('Checking for new migrations');
  try {
    await migrate(db, { migrationsFolder: './drizzle' });
    console.log('Migration success!');
  } catch (error) {
    console.error('Unable to apply migrations: ', error);
  }
}
