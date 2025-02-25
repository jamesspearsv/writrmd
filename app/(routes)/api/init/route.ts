import { initDatabase } from '@/app/lib/database';

export async function GET() {
  try {
    await initDatabase();
    return Response.json({ message: 'Database initialized' });
  } catch (error) {
    console.error(error);
    return Response.json({
      message:
        'Error initializing database. Check server console for more information',
    });
  }
}
