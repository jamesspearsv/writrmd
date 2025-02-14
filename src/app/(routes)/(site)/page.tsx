import { fetchPage } from '@/src/app/lib/actions';
import Markdown from 'marked-react';
import styles from './index.module.css';
import PlaceholderPage from '@/src/app/ui/common/PlaceholderPage';

export default async function Home() {
  const page = await fetchPage('index');

  if (!page) return <PlaceholderPage />;

  return (
    <main className={styles.main}>
      <Markdown gfm={true} openLinksInNewTab={false}>
        {page.content}
      </Markdown>
    </main>
  );
}
