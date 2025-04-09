import VNav from '@/app/ui/nav/VNav';
import styles from './layout.module.css';
import ThemePicker from '@/app/ui/themes/ThemePicker';
import { LogOut, Layout as FeatherLayout } from 'react-feather';
import { logout } from '@/app/lib/authActions';
import Link from 'next/link';
import StyledButton from '@/app/ui/common/StyledButton';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <VNav>
        <hr />
        <br />
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
              <FeatherLayout size={22} />
            </div>
          </Link>
        </div>
      </VNav>
      <main className={styles.main}>
        <section className={styles.section}>{children}</section>
      </main>
    </>
  );
}
