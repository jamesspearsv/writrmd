'use client';

import { login } from '@/app/lib/auth';
import { useActionState } from 'react';

export interface LoginState {
  error?: string;
}

const initialState: LoginState = {};

export default function Page() {
  const [actionState, formAction] = useActionState(login, initialState);
  return (
    <main>
      <form
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
          width: '50%',
          margin: 'auto',
        }}
        action={formAction}
      >
        <label htmlFor="username">Username</label>
        <input type="text" name="username" id="username" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <input type="submit" value="login" />
      </form>
      <p>{actionState.error}</p>
    </main>
  );
}
