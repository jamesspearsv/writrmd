import VNav from '@/app/ui/nav/VNav';
import styles from './layout.module.css';
import ThemePicker from '@/app/ui/themes/ThemePicker';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className={styles.container}>
      <VNav>
        <ThemePicker alt={true} />
      </VNav>
      {children}
    </div>
  );
}
