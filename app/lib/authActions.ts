'use server';

import { LoginState } from '@/app/ui/forms/LoginForm';
import { signIn, signOut } from '@/auth';
import { CredentialsSignin } from 'next-auth';
import { redirect } from 'next/navigation';

export async function login(state: LoginState, data: FormData) {
  const username = data.get('username');
  const password = data.get('password');
  if (!(username && password))
    return { error: 'Username and password required' };

  try {
    await signIn('credentials', {
      username,
      password,
      redirectTo: '/writr',
    });
    return {};
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
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
