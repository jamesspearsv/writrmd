// TODO: Register function causes edge runtime errors. Figure out how to solve this

export async function register() {
  console.log('Runtime: ', process.env.NEXT_RUNTIME);
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Checking for new migrations');
    const { db } = await import('@/app/db/connection');
    const { migrate } = await import('drizzle-orm/postgres-js/migrator');

    try {
      await migrate(db, { migrationsFolder: './drizzle' });
      console.log('Migration success!');
    } catch (error) {
      console.error('Unable to apply migrations: ', error);
    }
  }
}
