import { getUser } from '@/app/lib/database';

// validate request
export async function GET(req: Request) {
  if (!req.headers.get('x-api-key'))
    return Response.json(
      { message: 'Unauthenticated access' },
      { status: 401 }
    );

  if (!(req.headers.get('x-api-key') === (process.env.API_KEY as string))) {
    return Response.json(
      {
        message: 'Unauthorized access',
      },
      { status: 403 }
    );
  }

  const params = new URL(req.url).searchParams;
  if (!params.get('username'))
    return Response.json(
      { message: 'Must provide a username' },
      { status: 401 }
    );

  // Query for user and return result
  const user = await getUser(params.get('username') as string);
  return Response.json(user);
}
