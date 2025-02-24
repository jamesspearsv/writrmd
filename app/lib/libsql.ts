import { createClient } from '@libsql/client';

const rootDir = process.env.ROOT_PATH;
const client = createClient({
  url: `file:${rootDir}/content/libsql.db`,
});

export async function applyMigrations() {
  const createStatement = `CREATE TABLE IF NOT EXISTS users (
        userid integer primary key,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL);`;

  const insertUser = `INSERT INTO users (
        username, password) VALUES (?, ?)`;

  await client.execute(createStatement);
  await client.execute({
    sql: insertUser,
    args: ['admin', '12345'],
  });
}

export async function getUser(username: string, password: string) {
  const { rows } = await client.execute({
    sql: `SELECT * FROM users WHERE username='?'`,
    args: [username],
  });
  if (rows.length > 0) {
    console.log(rows[0]);
    return rows[0];
  }
  return null;
}
