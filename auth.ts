import NextAuth, { CredentialsSignin } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { Admin } from '@/app/lib/definitions';
const HOST = process.env.APP_HOST;

class DatabaseError extends CredentialsSignin {
  code = 'database_error';
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // check that username and password credentials are provided
        const { username, password } = credentials;
        if (!(username && password)) return null;
        // query database for matching username & parse response
        const res = await fetch(`${HOST}/api/user?username=${username}`, {
          method: 'GET',
          headers: {
            'x-api-key': process.env.API_KEY as string,
          },
        });
        const user = await res.json();

        // if no users table exists
        if (res.status === 500 && user.message === 'database_error') {
          throw new DatabaseError();
        }

        if (!user) return null;
        if (await bcrypt.compare(password as string, user.password)) {
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
          return NextResponse.redirect(new URL('/writr', baseURL));
        }
        return true;
      } else {
        // redirect if an unauthenticated user attempts to visit /writr/[path]
        // if (pathname.startsWith('/writr')) {
        //   return Response.redirect(new URL('/login', baseURL));
        // }
        return false;
      }
    },
  },
  session: {
    maxAge: 21600,
  },
});
