'use server';

import Database from 'better-sqlite3';
import bcrypt from 'bcrypt';
const rootDir = process.env.ROOT_PATH;
const db = Database(`${rootDir}/content/writr.db`, { verbose: console.log });

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function applyMigrations() {
  console.log('Creating users table...');
  db.exec(`CREATE TABLE IF NOT EXISTS users (
        userid integer primary key,
        username varchar(255) NOT NULL,
        password varchar(255) NOT NULL);`);
  console.log('TABLE CREATED!');

  if (process.env.NODE_ENV === 'development') {
    // check is admin user exists
    const checkStatement = db.prepare(
      `SELECT * FROM users WHERE username='admin';`
    );
    const result = checkStatement.get();

    if (result) {
      console.log('Admin user found!');
    } else {
      console.log('Inserting development admin user account...');
      const username = 'admin';
      const hashedPwd = await hashPassword('admin');
      const insertStatement = db.prepare(`INSERT INTO users (username, password)
            VALUES (?, ?);`);
      insertStatement.run([username, hashedPwd]);
    }
  }
}

export async function getAdmin(username: string, password: string) {
  const sql = db.prepare(`SELECT * FROM users WHERE username=?;`);
  const row = sql.get(username) as {
    userid: string;
    username: string;
    password: string;
  };
  if (!row) return null;
  const matchingPasswords = await bcrypt.compare(password, row.password);
  if (!matchingPasswords) return null;
  return row;
}
