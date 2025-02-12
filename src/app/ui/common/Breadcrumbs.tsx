'use client';

import Breadcrumb from '@/src/app/ui/common/Breadcrumb';
import styles from './Breadcrumbs.module.css';

import { usePathname } from 'next/navigation';

export default function Breadcrumbs() {
  const pathname = usePathname();
  const path = pathname?.split('/');
  path?.splice(0, 1);

  return (
    <section className={styles.breadcrumbs}>
      {path &&
        path.length > 0 &&
        path.map((section, index) => (
          <Breadcrumb key={index} title={section} index={index} path={path} />
        ))}
    </section>
  );
}
