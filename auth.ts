import NextAuth, { CredentialsSignin, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

interface AdminUser extends User {
  username: string;
}

// todo: write logic to handle password hashing

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      authorize: async (credentials) => {
        console.log(credentials);
        if (!(credentials.username && credentials.password)) {
          throw new CredentialsSignin('No credentials provided');
        }

        // todo: Add username & password verification logic
        if (
          !(
            credentials.username === 'james' && credentials.password === 'james'
          )
        ) {
          throw new CredentialsSignin('Invalid credentials');
        }

        return {
          username: credentials.username,
        } as AdminUser;
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
