import VNav from '@/app/ui/nav/VNav';
import styles from './layout.module.css';
import ThemePicker from '@/app/ui/themes/ThemePicker';
import StyledButton from '@/app/ui/common/StyledButton';
import { logout } from '@/app/lib/authActions';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className={styles.container}>
      <VNav>
        <StyledButton
          onClick={async () => {
            'use server';
            await logout();
          }}
        >
          Sign Out
        </StyledButton>
        <ThemePicker alt={true} />
      </VNav>
      {children}
    </div>
  );
}
