import bcrypt from 'bcryptjs';
import { createClient } from '@libsql/client';

const rootDir = process.env.ROOT_PATH;
const client = createClient({
  url: `file:${rootDir}/content/libsql.db`,
});

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function initDatabase() {
  console.log('Creating Users table if not exists already...');
  const createStatement = `CREATE TABLE IF NOT EXISTS Users (
      userid integer primary key,
      username varchar(255) NOT NULL,
      password varchar(255) NOT NULL)`;
  await client.execute(createStatement);

  // check that admin user has been created
  const selectStatement = `SELECT * FROM Users WHERE username='admin'`;
  const { rows } = await client.execute(selectStatement);

  if (rows.length === 0) {
    const insertUser = `INSERT INTO Users (
          username, password) VALUES (?, ?)`;

    await client.execute({
      sql: insertUser,
      args: ['admin', await hashPassword('12345')],
    });
  }
}

export async function getUser(username: string) {
  const { rows } = await client.execute({
    sql: `SELECT * FROM Users WHERE username=?`,
    args: [username],
  });
  return rows[0] ?? null;
}
