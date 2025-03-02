import HNav from '@/app/ui/nav/HNav';
import ThemePicker from '@/app/ui/themes/ThemePicker';

export default function Layout({ children }: { children?: React.ReactNode }) {
  return (
    <div>
      <HNav>
        <ThemePicker />
      </HNav>
      {children}
    </div>
  );
}
