'use client';

import { insertPost } from '@/app/db/queries';

export default function Page() {
  async function handleClick() {
    await insertPost({
      title: 'A test post',
      body: 'This is a test post for pg',
      published: false,
    });
  }

  return (
    <main style={{ margin: '3rem' }}>
      <h1>Postgres Migration</h1>
      <button onClick={handleClick}>Insert post</button>
    </main>
  );
}
