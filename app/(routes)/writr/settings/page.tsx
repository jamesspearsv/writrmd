import { readSettings } from '@/app/lib/actions';
import Header from '@/app/ui/common/Header';
import SettingsItem from '@/app/ui/settings/SettingsItem';

export default async function Page() {
  const settings = await readSettings();

  if (!settings.success) return null;
  const { data } = settings;

  return (
    <>
      <Header>
        <h1>Settings</h1>
      </Header>
      <SettingsItem property="name" value={data.name} label="Name" />
      <SettingsItem
        property="summary"
        value={data.summary}
        label="Summary"
        editor
      />
      <SettingsItem property="icon" value={data.icon} label="Icon" />
    </>
  );
}
