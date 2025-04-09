import AdminNav from '@/app/ui/nav/AdminNav';
import styles from './layout.module.css';

export default function Layout({
  children,
}: {
  children: Readonly<React.ReactNode>;
}) {
  return (
    <>
      <AdminNav />
      <main className={styles.main}>
        <section className={styles.section}>{children}</section>
      </main>
    </>
  );
}
