import Link from 'next/link';
import styles from './HNav.module.css';
import Image from 'next/image';
import { buildPagesIndex } from '@/app/lib/actions';

export default async function HNav({
  children,
}: {
  children?: React.ReactNode;
}) {
  const logoSize = 50;
  const pages = await buildPagesIndex();

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
        {pages &&
          pages.length > 0 &&
          pages.map((page, index) => (
            <li key={index}>
              <Link className={styles.link} href={`/${page.data.slug}`}>
                {page.data.title}
              </Link>
            </li>
          ))}
      </ul>
      <div>{children}</div>
    </nav>
  );
}
