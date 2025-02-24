import { getUser } from '@/app/lib/libsql';
import NextAuth, { CredentialsSignin, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

interface Admin extends User {
  userid: string;
  username: string;
  password: string;
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        console.log(credentials);
        if (!(credentials.username && credentials.password)) {
          throw new CredentialsSignin('No credentials provided');
        } else {
          // todo: Add username & password verification
          console.log('work in progress');
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

      // return authenticated;

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
