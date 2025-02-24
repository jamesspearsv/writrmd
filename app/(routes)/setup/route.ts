import { applyMigrations } from '@/app/lib/libsql';

export async function GET() {
  try {
    await applyMigrations();
    return Response.json({ ok: 'true', message: 'Users table created!' });
  } catch (error) {
    console.error(error);
    return Response.json({
      ok: 'false',
      message: 'Error creating users table',
    });
  }
}
