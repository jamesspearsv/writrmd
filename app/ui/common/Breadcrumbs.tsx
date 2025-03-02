'use client';

import Breadcrumb from '@/app/ui/common/Breadcrumb';
import styles from './Breadcrumbs.module.css';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { useScroll } from '@/app/lib/hooks';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const path = pathname?.split('/');
  // remove leading '/' from pathname
  path?.splice(0, 1);
  const scroll = useScroll();

  const scrollLimit = 115;

  return (
    <section
      className={clsx(
        `${styles.breadcrumbs}`,
        scroll > scrollLimit && `${styles.atTop}`
      )}
    >
      {path &&
        path.length > 0 &&
        path.map((section, index) => (
          <Breadcrumb key={index} title={section} index={index} path={path} />
        ))}
    </section>
  );
}
