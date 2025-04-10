'use client';

import Link from 'next/link';
import styles from './SiteNav.module.css';
import clsx from 'clsx';
import ThemePicker from '@/app/ui/themes/ThemePicker';

// todo: #55 Refactor HNav to centralize component elements

export default function SiteNav(props: { blogName: string }) {
  return (
    <nav className={styles.nav}>
      <ul className={clsx(`${styles.list}`)}>
        <li className={clsx(`${styles.navHeading}`)}>
          <Link href={'/'}>{props.blogName}</Link>
        </li>
        <li>
          <Link className={styles.link} href={'/blog'}>
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
