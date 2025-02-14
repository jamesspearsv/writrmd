import Link from 'next/link';
import styles from './VNav.module.css';

export default function VNav({ children }: { children?: React.ReactNode }) {
  return (
    <nav className={styles.nav}>
      <div>
        <ul className={styles.list}>
          <li>
            <Link href={'/'}>Back to App</Link>
          </li>
          <li>
            <Link href={'/'}>Back to App</Link>
          </li>
          <li>
            <Link href={'/'}>Back to App</Link>
          </li>
          <li>
            <Link href={'/'}>Back to App</Link>
          </li>
          <li>
            <Link href={'/'}>Back to App</Link>
          </li>
        </ul>
      </div>
      <div className={styles.actions}>{children}</div>
    </nav>
  );
}
