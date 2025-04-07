'use client';

import Link from 'next/link';
import styles from './HNav.module.css';
import { roboto_slab } from '@/app/ui/fonts';
import clsx from 'clsx';

export default function HNav({
  ...props
}: {
  children?: React.ReactNode;
  blogName: string;
}) {
  return (
    <nav className={styles.nav}>
      <ul className={clsx(`${styles.list}`)}>
        <li
          className={clsx(`${styles.navHeading}`, `${roboto_slab.className}`)}
        >
          <Link href={'/'}>{props.blogName}</Link>
        </li>
        <li>
          <Link className={styles.link} href={'/blog'}>
            Blog
          </Link>
        </li>
      </ul>
      <div>{props.children}</div>
    </nav>
  );
}
