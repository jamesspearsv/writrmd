'use server';

import bcrypt from 'bcryptjs';
import Database from 'better-sqlite3';
import { CredentialsSchema } from '@/app/lib/schemas';
import { SetUpActionState } from '@/app/lib/definitions';

const rootDir = process.env.ROOT_PATH;
const client = new Database(`${rootDir}/content/libsql.db`);

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function checkForUsersTable() {
  try {
    const checkForUsersTable = client.prepare(`SELECT * FROM Users;`);
    checkForUsersTable.run();
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
}

export async function checkForAdminUser() {
  try {
    const selectAdminUser = client.prepare(`SELECT * FROM Users;`);
    const row = selectAdminUser.get();
    if (row) return true;
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function initDatabase() {
  const createUsersTable = client.prepare(`CREATE TABLE IF NOT EXISTS Users (
      user_id integer primary key,
      username varchar(255) NOT NULL,
      password varchar(255) NOT NULL)`);
  createUsersTable.run();

  const createAdminHistoryTable =
    client.prepare(`CREATE TABLE IF NOT EXISTS Action_History (
    action_id integer primary key,
    action_type varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    date varchar(255) NOT NULL);`);
  createAdminHistoryTable.run();

  const insertNewAction = client.prepare(
    `INSERT INTO Action_History (action_type, description, date) VALUES ('create_table' , 'Create Users table', ?);`
  );
  insertNewAction.run(new Date().toISOString());
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
    const insertUser = client.prepare(`INSERT INTO Users (
      username, password) VALUES (?, ?)`);
    const insertAction = client.prepare(`INSERT INTO Action_History (
      action_type, description, date) VALUES('add_user', ?, ?)`);

    insertUser.run(
      parsedData.data.username,
      await hashPassword(parsedData.data.password)
    );
    insertAction.run(
      `Insert new user: ${parsedData.data.username}`,
      new Date().toISOString()
    );

    return { error: '' };
  } catch (error) {
    console.log(error);
    return { error: 'Server error' };
  }
}

/**
 *
 * @param {string} username - Username to query database
 * @returns {Row | null} If a user was found returns user row else returns undefined
 */
export async function getUser(username: string) {
  return client.prepare('SELECT * FROM Users WHERE username=?').get(username);
}
