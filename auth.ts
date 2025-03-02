import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { NextResponse } from 'next/server';
import { Admin } from '@/app/lib/definitions';
import { CredentialsSchema } from '@/app/lib/schemas';

// class DatabaseError extends CredentialsSignin {
//   code = 'database_error';
// }

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;
        if (!ADMIN_USERNAME && ADMIN_PASSWORD) return null;

        // check that username and password credentials are provided
        const { username, password } = credentials;
        const parsedCredentials = CredentialsSchema.safeParse({
          username,
          password,
        });
        if (!parsedCredentials.success) return null;

        if (parsedCredentials.data.username !== ADMIN_USERNAME) return null;
        if (parsedCredentials.data.password !== ADMIN_PASSWORD) return null;

        return {
          username: parsedCredentials.data.username,
        } as Admin;
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
        if (pathname.startsWith('/writr')) {
          return Response.redirect(new URL('/login', baseURL));
        }
        return false;
      }
    },
  },
  session: {
    maxAge: 21600,
  },
});
