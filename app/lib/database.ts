'use server';

import bcrypt from 'bcryptjs';
import { createClient } from '@libsql/client';
import { CredentialsSchema } from '@/app/lib/schemas';
import { SetUpActionState } from '@/app/lib/definitions';

const rootDir = process.env.ROOT_PATH;
const client = createClient({
  url: `file:${rootDir}/content/libsql.db`,
});

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function checkForUsersTable() {
  const checkForUsersTable = `SELECT * FROM Users;`;
  try {
    await client.execute(checkForUsersTable);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function checkForAdminUser() {
  const selectAdminUser = `SELECT * FROM Users;`;
  try {
    const { rows } = await client.execute(selectAdminUser);
    if (rows.length > 0) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function initDatabase() {
  const createUsersTable = `CREATE TABLE IF NOT EXISTS Users (
      user_id integer primary key,
      username varchar(255) NOT NULL,
      password varchar(255) NOT NULL)`;
  const createAdminHistoryTable = `CREATE TABLE IF NOT EXISTS Action_History (
    action_id integer primary key,
    action_type varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    date varchar(255) NOT NULL);`;
  const insertNewAction = `INSERT INTO Action_History (action_type, description, date) VALUES ('create_table' , 'Create Users table', ?);`;
  await client.batch([
    createUsersTable,
    createAdminHistoryTable,
    {
      sql: insertNewAction,
      args: [new Date().toISOString()],
    },
  ]);
}

// todo:  Add an authAction layer between this function and data collection step
export async function addAdmin(state: SetUpActionState, data: FormData) {
  const username = data.get('username');
  const password = data.get('password');

  if (!(username && password)) {
    return { error: 'Username and password required' };
  }

  const parsedData = CredentialsSchema.safeParse({
    username,
    password,
  });

  if (!parsedData.success) {
    console.log(parsedData.error);
    return { error: 'Username and password must be at least 5 characters' };
  }

  try {
    const insertUser = `INSERT INTO Users (
      username, password) VALUES (?, ?)`;
    const insertAction = `INSERT INTO Action_History (
      action_type, description, date) VALUES('add_user', ?, ?)`;
    await client.batch([
      {
        sql: insertUser,
        args: [
          parsedData.data.username,
          await hashPassword(parsedData.data.password),
        ],
      },
      {
        sql: insertAction,
        args: [
          `Insert new user: ${parsedData.data.username}`,
          new Date().toISOString(),
        ],
      },
    ]);

    return { error: '' };
  } catch (error) {
    console.log(error);
    return { error: 'Server error' };
  }
}

/**
 *
 * @param {string} username - Username to query database
 * @returns {Row | null} If a user was found returns user row else returns null
 */
export async function getUser(username: string) {
  const { rows } = await client.execute({
    sql: `SELECT * FROM Users WHERE username=?`,
    args: [username],
  });
  return rows[0] ?? null;
}
