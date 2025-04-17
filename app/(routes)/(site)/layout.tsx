import { readSettings } from '@/app/lib/actions';
import SiteNav from '@/app/ui/nav/SiteNav';
import styles from './layout.module.css';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  console.log('site layout');
  const settings = await readSettings();

  if (!settings.success) {
    console.log('window = ', typeof window !== undefined);
  }

  return (
    <>
      <SiteNav blogName={settings.success ? settings.data.name : 'Writr.md'} />
      <main className={styles.main}>{children}</main>
    </>
  );
}
