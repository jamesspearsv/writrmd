import LoginForm from '@/app/ui/forms/LoginForm';
import ThemePicker from '@/app/ui/themes/ThemePicker';

export default function Page() {
  return (
    <main>
      <LoginForm />
      <div
        style={{
          position: 'fixed',
          top: '1.5rem',
          right: '1.5rem',
        }}
      >
        <ThemePicker />
      </div>
    </main>
  );
}
