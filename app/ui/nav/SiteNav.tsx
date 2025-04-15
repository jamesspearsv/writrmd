'use client';

import Link from 'next/link';
import styles from './SiteNav.module.css';
import clsx from 'clsx';
import ThemePicker from '@/app/ui/themes/ThemePicker';
import { usePathname } from 'next/navigation';

export default function SiteNav(props: { blogName: string }) {
  const pathname = usePathname();

  return (
    <nav className={styles.nav}>
      <ul className={clsx(`${styles.list}`)}>
        <li>
          <Link href={'/'} className={clsx(`${styles.heading}`)}>
            {props.blogName}
          </Link>
        </li>
        <li>
          <Link
            href={'/blog'}
            className={clsx(
              `${styles.link}`,
              pathname === '/blog' && `${styles.active}`
            )}
          >
            Blog
          </Link>
        </li>
      </ul>
      <div>
        <ThemePicker />
      </div>
    </nav>
  );
}
