'use server';

import { LoginState } from '@/app/ui/forms/LoginForm';
import { signIn, signOut } from '@/auth';
import { CredentialsSignin } from 'next-auth';
import { redirect } from 'next/navigation';

export async function login(state: LoginState, data: FormData) {
  try {
    await signIn('credentials', {
      username: data.get('username'),
      password: data.get('password'),
      redirectTo: '/writr',
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      if (error.code === 'database_error') {
        redirect('/setup');
      }

      return {
        error: 'Invalid username or password',
      };
    }
    throw error;
  }

  return state;
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
