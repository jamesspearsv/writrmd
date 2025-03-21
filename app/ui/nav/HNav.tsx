import Link from 'next/link';
import styles from './HNav.module.css';
import { readSettings } from '@/app/lib/actions';
import { roboto_slab } from '@/app/ui/fonts';
import clsx from 'clsx';

export default async function HNav({
  children,
}: {
  children?: React.ReactNode;
}) {
  const settings = await readSettings();

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li
          className={clsx(`${styles.navHeading}`, `${roboto_slab.className}`)}
        >
          <Link href={'/'}>
            {settings.success ? settings.data.name : 'Placeholder'}
          </Link>
        </li>
        <li>
          <Link className={styles.link} href={'/blog'}>
            Blog
          </Link>
        </li>
      </ul>
      <div>{children}</div>
    </nav>
  );
}
