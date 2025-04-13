import { readSettings } from '@/app/lib/actions';
import Header from '@/app/ui/common/Header';
import SettingsEditor from '@/app/ui/editors/SettingsEditor';
import SettingsItem from '@/app/ui/settings/SettingsItem';

export default async function Page() {
  const result = await readSettings();

  if (!result.success) return null;
  const settings = result.data;

  return (
    <>
      <Header>
        <h1>Settings</h1>
      </Header>
      <SettingsItem property="name" value={settings.name} label="Name" />
      <SettingsItem
        property="summary"
        value={settings.summary}
        label="Summary"
        editor
      />
      <br />
      <hr />
      <br />
      <h3>Socials</h3>
      <SettingsEditor settings={settings} />
    </>
  );
}
