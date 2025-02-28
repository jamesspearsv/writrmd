'use client';

import {
  addAdmin,
  checkForAdminUser,
  checkForUsersTable,
  initDatabase,
} from '@/app/lib/database';
import Link from 'next/link';
import { useActionState, useEffect, useState } from 'react';
import styles from './page.module.css';
import { SetUpActionState } from '@/app/lib/definitions';

const initialState: SetUpActionState = { error: '' };

export default function Page() {
  const [userTable, setUserTable] = useState(false);
  const [adminUser, setAdminUser] = useState(false);
  const [state, addAdminAction] = useActionState(addAdmin, initialState);

  // todo: move setup ui to a component and add a protective check to prevent unintended user creation

  useEffect(() => {
    (async () => {
      const table = await checkForUsersTable();
      setUserTable(table);
      const user = await checkForAdminUser();
      setAdminUser(user);
    })();
  }, [state]);

  function createTable() {
    (async () => {
      try {
        await initDatabase();
        setUserTable(true);
      } catch {
        setUserTable(false);
      }
    })();
  }

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.headingContainer}>
          <h1>First time setup</h1>
          {userTable && adminUser ? (
            <p>
              Initial set up complete! Head back to{' '}
              <Link href={'/writr'}>/writr</Link>
            </p>
          ) : (
            <p>Complete the initial setup steps below</p>
          )}
        </div>
        <div className={styles.stepContainer}>
          <h2>Create a Users table</h2>
          {userTable ? (
            <p>Users table created!</p>
          ) : (
            <button onClick={createTable}>Create Users table</button>
          )}
        </div>
        {userTable && (
          <div className={styles.stepContainer}>
            <h2>Create an admin user</h2>
            {adminUser ? (
              'Admin user(s) created'
            ) : (
              <form action={addAdminAction} className={styles.form}>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" />
                <input type="submit" value="Add user" />
                {state.error && <p>{state.error}</p>}
              </form>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
