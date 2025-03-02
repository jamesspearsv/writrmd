'use client';

import { login } from '@/app/lib/authActions';
import { useActionState } from 'react';
import styles from './LoginForm.module.css';
import logo from '@/public/writrmd-logo.svg';
import Image from 'next/image';
import { roboto_slab } from '@/app/ui/fonts';

export interface LoginState {
  error?: string;
}

const initialState: LoginState = {};

export default function LoginForm() {
  const [actionState, formAction] = useActionState(login, initialState);
  return (
    <form className={styles.formContainer} action={formAction}>
      <div className={styles.heading}>
        <Image src={logo} height={50} width={50} alt="Writr.md logo" />
        <h1 className={roboto_slab.className}>Writr.md</h1>
      </div>
      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter your username..."
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Enter your password..."
      />
      <input type="submit" value="Login" />
      <p className={styles.errorDetails}>{actionState.error}</p>
    </form>
  );
}
