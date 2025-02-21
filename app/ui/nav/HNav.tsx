import Link from 'next/link';
import styles from './HNav.module.css';
import Image from 'next/image';

export default function HNav({ children }: { children?: React.ReactNode }) {
  const logoSize = 50;

  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li>
          <Link href={'/'}>
            <Image
              src="/icon.png"
              alt="Writr.md logo"
              width={logoSize}
              height={logoSize}
            />
          </Link>
        </li>
        <li>
          <Link className={styles.link} href={'/blog'}>
            Blog
          </Link>
        </li>
      </ul>
      <div>{children}</div>
    </nav>
  );
}
