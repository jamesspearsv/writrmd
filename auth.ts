import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
const HOST = process.env.APP_HOST;

interface Admin extends User {
  username: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // check that username and password credentials are provided
        if (!(credentials.username && credentials.password)) return null;

        const req = await fetch(
          `${HOST}/api/user?username=${credentials.username}`,
          {
            method: 'GET',
            headers: {
              'x-api-key': process.env.API_KEY as string,
            },
          }
        );
        const user = await req.json();
        if (!user) return null;
        // if ((credentials.password as string) !== user.password) return null;
        if (
          await bcrypt.compare(credentials.password as string, user.password)
        ) {
          return {
            username: user.username,
          } as Admin;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized: async ({ auth, request }) => {
      const pathname = request.nextUrl.pathname;
      const baseURL = request.nextUrl.origin;
      const authenticated = !!auth;

      if (authenticated) {
        if (pathname.startsWith('/login')) {
          return Response.redirect(new URL('/writr', baseURL));
        }
        return true;
      } else {
        // redirect request if an unauthenticated user
        // attempts to visit /writr/[path]
        if (pathname.startsWith('/writr')) {
          return Response.redirect(new URL('/login', baseURL));
        }
        return false;
      }
    },
  },
});
