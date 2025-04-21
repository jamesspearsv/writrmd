import { readSettings } from '@/app/lib/actions';
import SettingsEditor from '@/app/ui/editors/SettingsEditor';

export default async function Page() {
  const result = await readSettings();

  if (!result.success) return null;
  const settings = result.data;

  return <SettingsEditor settings={settings} />;
}
