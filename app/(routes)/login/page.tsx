import LoginForm from '@/app/ui/forms/LoginForm';
import ThemePicker from '@/app/ui/themes/ThemePicker';
import styles from './page.module.css';

export default function Page() {
  return (
    <div className={styles.container}>
      <LoginForm />
      <div className={styles.theme_picker_container}>
        <ThemePicker />
      </div>
    </div>
  );
}
