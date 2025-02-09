'use client';

import Link from 'next/link';
import styles from './Breadcrumbs.module.css';

export default function Breadcrumb({
  title,
  index,
  path,
}: {
  title: string;
  index: number;
  path: string[];
}) {
  console.log('path', path);
  console.log('index', index);
  let href = '';

  for (let i = 0; i <= index; i++) {
    href = href + '/' + path[i];
  }

  console.log(href);

  return (
    <div className={styles.breadcrumb}>
      <Link href={href}>{title}</Link>
    </div>
  );
}
