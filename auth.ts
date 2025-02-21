import NextAuth, { User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

interface AdminUser extends User {
  username: string;
  token?: string;
}

// todo: write logic to handle password hashing

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        username: {},
        password: {},
      },
      authorize: async (credentials) => {
        if (!(credentials.username && credentials.password)) return null;

        // todo: Add username & password verification logic

        return {
          username: credentials.username,
        } as AdminUser;
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth, request }) => {
      console.log('CALLBACK');
      const pathname = request.nextUrl.pathname;
      const baseURL = request.nextUrl.origin;
      const authenticated = !!auth;

      // redirect request if an unauthenticated user
      // attempts to visit /writr/[path]
      if (!authenticated && pathname.startsWith('/writr')) {
        return Response.redirect(new URL('/login', baseURL));
      }

      // return true is auth is valid
      return true;
    },
  },
  pages: {
    signIn: '/login',
  },
});
