'use client';

import Breadcrumb from '@/app/ui/common/Breadcrumb';
import styles from './Breadcrumbs.module.css';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const path = pathname?.split('/');
  // remove leading '/' from pathname
  path?.splice(0, 1);

  return (
    <section className={clsx(`${styles.container}`)}>
      <div className={styles.breadcrumbs}>
        {path &&
          path.length > 0 &&
          path.map((section, index) => (
            <Breadcrumb key={index} title={section} index={index} path={path} />
          ))}
      </div>
    </section>
  );
}
