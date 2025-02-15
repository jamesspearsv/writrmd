import Link from 'next/link';
import styles from './VNav.module.css';
import { roboto_slab } from '@/app/ui/fonts';

export default function VNav({
  children,
  items,
}: {
  children?: React.ReactNode;
  items: {
    href: string;
    label: string;
  }[];
}) {
  return (
    <nav className={styles.nav}>
      <div>
        <h1 className={roboto_slab.className}>Writr.md</h1>
        <ul className={styles.list}>
          {items.map(({ href, label }) => (
            <Link href={href} key={href}>
              <li>{label}</li>
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.actions}>{children}</div>
    </nav>
  );
}
