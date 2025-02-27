import VNav from '@/app/ui/nav/VNav';
import styles from './layout.module.css';
import ThemePicker from '@/app/ui/themes/ThemePicker';
import StyledButton from '@/app/ui/common/StyledButton';
import { LogOut } from 'react-feather';
import { logout } from '@/app/lib/authActions';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className={styles.container}>
      <VNav>
        <div className={styles.buttonContainer}>
          <StyledButton
            className={styles.logoutButton}
            variation={'rounded'}
            onClick={async () => {
              'use server';
              await logout();
            }}
          >
            <LogOut size={22} />
          </StyledButton>
          <ThemePicker alt={true} />
        </div>
      </VNav>
      {children}
    </div>
  );
}
