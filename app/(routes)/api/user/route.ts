import { getUser } from '@/app/lib/database';
import { LibsqlError } from '@libsql/client';

// hack: this route is a workaround for edge runtime limitations in NextJS middleware

export async function GET(req: Request) {
  // validate request
  if (
    !(
      req.headers.get('x-api-key') &&
      req.headers.get('x-api-key') === (process.env.API_KEY as string)
    )
  ) {
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

  try {
    // Query for user and return result
    const user = await getUser(params.get('username') as string);
    return Response.json(user);
  } catch (error) {
    // handle any sqlite errors
    if (error instanceof LibsqlError) {
      // console.log('\n##### /api/user route.ts ###\n');
      // console.log(error);
      return Response.json({ message: 'database_error' }, { status: 500 });
    }
    return Response.json({ message: 'Server error' }, { status: 500 });
  }
}
