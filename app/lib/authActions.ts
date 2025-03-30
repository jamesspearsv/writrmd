'use server';

import { LoginState } from '@/app/ui/forms/LoginForm';
import { signIn, signOut } from '@/auth';
import { CredentialsSignin } from 'next-auth';

/**
 * Asynchronously call signIn function and provide basic credentials validation
 */
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
      return {
        error: 'Invalid username or password',
      };
    }
    throw error;
  }
}

/**
 * Asynchronously call signOut function
 */
export async function logout() {
  await signOut({ redirectTo: '/login' });
}
