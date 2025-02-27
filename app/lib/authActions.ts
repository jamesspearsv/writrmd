'use server';

import { LoginState } from '@/app/(routes)/login/page';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';

// todo: explore best way to handle sign in errors
// redirect: false config or using try catch error with CredentialsSignIn errors
export async function login(state: LoginState, data: FormData) {
  try {
    await signIn('credentials', data);
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: 'Invalid credentials',
      };
    }
    throw error;
  }

  return state;
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
