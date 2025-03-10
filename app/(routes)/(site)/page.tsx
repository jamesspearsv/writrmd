import { readSettings } from '@/app/lib/actions';
import Markdown from 'marked-react';
import styles from './index.module.css';
import PlaceholderPage from '@/app/ui/common/PlaceholderPage';

export default async function Home() {
  const settings = await readSettings();

  if (!settings.success) return <PlaceholderPage />;

  return (
    <main className={styles.main}>
      <Markdown gfm={true} openLinksInNewTab={false}>
        {`# ${settings.data.blogName}\n\n${settings.data.blogSummary}`}
      </Markdown>
    </main>
  );
}
