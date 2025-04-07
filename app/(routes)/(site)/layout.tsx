import { readSettings } from '@/app/lib/actions';
import HNav from '@/app/ui/nav/HNav';
import ThemePicker from '@/app/ui/themes/ThemePicker';

export default async function Layout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const settings = await readSettings();

  return (
    <>
      <HNav blogName={settings.success ? settings.data.name : 'Writr.md'}>
        <ThemePicker />
      </HNav>
      <main>{children}</main>
    </>
  );
}
