import Link from 'next/link';
import styles from './VNav.module.css';
import { roboto_slab } from '@/app/ui/fonts';
import { BookOpen, Home, Layout, Settings } from 'react-feather';

export default function VNav({ children }: { children?: React.ReactNode }) {
  return (
    <nav className={styles.nav}>
      <div>
        <h1 className={roboto_slab.className}>Writr.md</h1>
        <ul className={styles.list}>
          <NavItem href="/writr" label="Dashboard">
            <Home size={16} />
          </NavItem>
          <NavItem href="/" label="Visit site" target="_blank">
            <Layout size={16} />
          </NavItem>
          <NavItem href="/writr/posts" label="Posts">
            <BookOpen size={16} />
          </NavItem>
          <NavItem href="/writr/settings" label="Settings">
            <Settings size={16} />
          </NavItem>
        </ul>
      </div>
      <div className={styles.actions}>{children}</div>
    </nav>
  );
}

function NavItem({
  href,
  label,
  target,
  children,
}: {
  href: string;
  label: string;
  target?: '_blank';
  children: React.ReactNode;
}) {
  return (
    <li key={href}>
      <Link href={href} className={styles.itemLink} target={target}>
        <div className={styles.item}>
          {children}
          {label}
        </div>
      </Link>
    </li>
  );
}
