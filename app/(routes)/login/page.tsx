import LoginForm from '@/app/ui/forms/LoginForm';
import ThemePicker from '@/app/ui/themes/ThemePicker';
import styles from './page.module.css';
import Link from 'next/link';
import Icon from '@/app/ui/common/Icon';

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
