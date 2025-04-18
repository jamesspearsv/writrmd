'use client';

import { BlogSettings } from '@/app/lib/definitions';
import Header from '@/app/ui/common/Header';
import Icon from '@/app/ui/common/Icon';
import StyledButton from '@/app/ui/common/StyledButton';
import { useActionState, useEffect, useState } from 'react';
import styles from './SettingsEditor.module.css';
import { UpdateSettings } from '@/app/lib/actions';

/*** COMPONENT STARTS HERE ***/
export default function SettingsEditor(props: { settings: BlogSettings }) {
  const [viewing, setViewing] = useState(true);
  const [state, action] = useActionState(UpdateSettings, {
    success: true,
    data: props.settings,
  });

  useEffect(() => {
    if (state.success) setViewing(true);
  }, [state]);

  return (
    <form action={action}>
      <Header>
        <div className={styles.heading_container}>
          <div>
            <h1 style={{ color: state.success ? 'green' : 'red' }}>Settings</h1>
            {!state.success && <p>{state.error}</p>}
          </div>
          <div>
            {viewing ? (
              <StyledButton onClick={() => setViewing(false)}>
                <Icon name={'Edit'} />
              </StyledButton>
            ) : (
              <>
                <StyledButton onClick={() => setViewing(true)}>
                  <Icon name="XCircle" />
                </StyledButton>
                <StyledButton type="submit">
                  <Icon name={'Save'} />
                </StyledButton>
              </>
            )}
          </div>
        </div>
      </Header>
      <Item
        property={'name'}
        label="Blog Name"
        value={props.settings.name}
        viewing={viewing}
      />
      <Item
        property="summary"
        label="Blog Summary"
        value={props.settings.summary}
        viewing={viewing}
      />
    </form>
  );
}

function Item<K extends keyof BlogSettings>(props: {
  property: K;
  value: BlogSettings[K];
  label: string;
  viewing: boolean;
}) {
  return (
    <div className={styles.item_container}>
      <label htmlFor={props.property} className={styles.item_label}>
        {props.label}
      </label>
      <div className={styles.item_value}>
        {props.viewing ? (
          <div>{props.value}</div>
        ) : (
          <input
            type="text"
            defaultValue={props.value}
            className={styles.item_input}
            name={props.property}
          />
        )}
      </div>
    </div>
  );
}
