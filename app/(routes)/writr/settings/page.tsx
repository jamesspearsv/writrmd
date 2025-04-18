import { readSettings } from '@/app/lib/actions';
import SettingsEditor from '@/app/ui/editors/SettingsEditor';

export default async function Page() {
  const result = await readSettings();

  if (!result.success) return null;
  const settings = result.data;

  return (
    <>
      <SettingsEditor settings={settings} />

      {/* <Header>
        <h1>Settings</h1>
      </Header>
      <hr />
      <h2>General Settings</h2>
      <SettingsItem property="name" value={settings.name} label="Name" />
      <SettingsItem
        property="summary"
        value={settings.summary}
        label="Summary"
        editor
      /> */}
    </>
  );
}
