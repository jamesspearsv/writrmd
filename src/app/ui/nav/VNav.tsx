import Link from 'next/link';
import styles from './VNav.module.css';

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
        <h2>Writr.md</h2>
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
