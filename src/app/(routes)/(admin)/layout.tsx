import VNav from '@/src/app/ui/nav/VNav';
import styles from './layout.module.css';
import ThemePicker from '@/src/app/ui/themes/ThemePicker';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <div className={styles.container}>
      <VNav>
        <ThemePicker />
      </VNav>
      {children}
    </div>
  );
}
