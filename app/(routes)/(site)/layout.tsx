import SiteNav from '@/app/ui/nav/SiteNav';
import styles from './layout.module.css';
import SITE_SETTINGS from '@/app/lib/settings';

export const dynamic = 'force-dynamic';

export default async function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  console.log('site layout');

  return (
    <>
      <SiteNav blogName={SITE_SETTINGS.SITE_NAME} />
      <main className={styles.main}>{children}</main>
    </>
  );
}
