import { fetchPage } from '@/src/app/lib/actions';
import Markdown from 'marked-react';
import Link from 'next/link';
import styles from './index.module.css';

export default async function Home() {
  const page = await fetchPage('index');

  if (!page) return null;

  return (
    <main className={styles.main}>
      <Markdown gfm={true}>{page.content}</Markdown>
    </main>
  );
}
