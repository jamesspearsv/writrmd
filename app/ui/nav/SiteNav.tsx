'use client';

import Link from 'next/link';
import styles from './SiteNav.module.css';
import clsx from 'clsx';
import ThemePicker from '@/app/ui/themes/ThemePicker';
import { usePathname } from 'next/navigation';
import { useScroll } from '@/app/lib/hooks';

export default function SiteNav(props: { blogName: string }) {
  const pathname = usePathname();
  const scrollY = useScroll();

  return (
    <nav
      className={clsx(`${styles.nav}`, scrollY > 25 && `${styles.scrolled}`)}
    >
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
