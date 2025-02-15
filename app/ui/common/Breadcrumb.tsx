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
  let href = '';

  for (let i = 0; i <= index; i++) {
    href = href + '/' + path[i];
  }

  return (
    <div className={styles.breadcrumb}>
      <Link href={href}>{title}</Link>
    </div>
  );
}
