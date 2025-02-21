'use server';

import { LoginState } from '@/app/(routes)/login/page';
import { signIn, signOut } from '@/auth';

export async function login(state: LoginState, data: FormData) {
  const username = data.get('username');
  const password = data.get('password');

  if (username && password) {
    await signIn('credentials', {
      username,
      password,
      redirectTo: '/writr',
    });
  }
  return state;
}

export async function logout() {
  await signOut({ redirectTo: '/login' });
}
