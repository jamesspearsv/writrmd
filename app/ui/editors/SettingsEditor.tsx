'use client';

import { UpdateSettings } from '@/app/lib/actions';
import { BlogSettings, Result } from '@/app/lib/definitions';
import { useActionState } from 'react';

const InitialState: Result<BlogSettings> = {
  success: false,
  error: '',
};

/*************************
 * COMPONENT STARTS HERE *
 ************************/
// todo: finish building settings editor using useActionState
export default function SettingsEditor(props: { settings: BlogSettings }) {
  const [state, action] = useActionState(UpdateSettings, InitialState);

  console.log(props.settings);

  return <div>Settings</div>;
}
