import Link from 'next/link';
import styles from './AdminNav.module.css';
import { roboto_slab } from '@/app/ui/fonts';
import { BookOpen, Home, Layout, LogOut, Settings } from 'react-feather';
import ThemePicker from '@/app/ui/themes/ThemePicker';
import StyledButton from '@/app/ui/common/StyledButton';
import { logout } from '@/app/lib/authActions';

export default function AdminNav() {
  return (
    <nav className={styles.nav}>
      <div>
        <h1 className={roboto_slab.className}>Writr.md</h1>
        <ul className={styles.list}>
          <NavItem href="/writr" label="Dashboard">
            <Home size={16} />
          </NavItem>
          <NavItem href="/writr/posts" label="Posts">
            <BookOpen size={16} />
          </NavItem>
          <NavItem href="/writr/settings" label="Settings">
            <Settings size={16} />
          </NavItem>
        </ul>
      </div>
      <div className={styles.actions}>
        <div className={styles.buttonContainer}>
          <ThemePicker />
          <StyledButton
            className={styles.button}
            onClick={async () => {
              'use server';
              await logout();
            }}
          >
            <LogOut size={22} />
          </StyledButton>
          <Link href={'/'}>
            <div className={styles.button}>
              <Layout size={22} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function NavItem(props: {
  href: string;
  label: string;
  target?: '_blank';
  children: React.ReactNode;
}) {
  return (
    <li key={props.href}>
      <Link href={props.href} className={styles.itemLink} target={props.target}>
        <div className={styles.item}>
          {props.children}
          {props.label}
        </div>
      </Link>
    </li>
  );
}
