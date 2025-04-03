import { readSettings } from '@/app/lib/actions';
import styles from './page.module.css';
import PlaceholderPage from '@/app/ui/common/PlaceholderPage';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';

export default async function Home() {
  const settings = await readSettings();

  if (!settings.success) return <PlaceholderPage />;

  return (
    <div className={styles.container}>
      <MarkdownWrapper
        value={`# ${settings.data.name}\n\n${settings.data.summary}`}
      />
    </div>
  );
}
