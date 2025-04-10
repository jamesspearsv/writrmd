import { readSettings } from '@/app/lib/actions';
import SiteNav from '@/app/ui/nav/SiteNav';
import styles from './layout.module.css';

export default async function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const settings = await readSettings();

  return (
    <>
      <SiteNav blogName={settings.success ? settings.data.name : 'Writr.md'} />
      <main className={styles.main}>{children}</main>
    </>
  );
}
