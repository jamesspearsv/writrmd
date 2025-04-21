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
  const [readOnly, setReadOnly] = useState(true);
  const [state, action] = useActionState(UpdateSettings, {
    success: true,
    data: props.settings,
  });

  useEffect(() => {
    if (state.success) setReadOnly(true);
  }, [state]);

  function handleClick() {
    setReadOnly((viewing) => !viewing);
  }

  if (readOnly) {
    return (
      <>
        <Header>
          <div className={styles.heading_container}>
            <div>
              <h1>Settings</h1>
            </div>
            <div className={styles.actions}>
              <StyledButton onClick={handleClick}>
                <Icon name="Edit" />
              </StyledButton>
            </div>
          </div>
        </Header>
        <div>
          <Item
            property="name"
            label="Blog Name"
            value={props.settings.name}
            readOnly={true}
          />
          <Item
            property="summary"
            label="Blog Summary"
            value={props.settings.summary}
            readOnly={true}
          />
        </div>
      </>
    );
  } else {
    return (
      <form action={action}>
        <Header>
          <div className={styles.heading_container}>
            <h1>Edit Settings</h1>
            {!state.success && (
              <p className={styles.error_message}>{state.error}</p>
            )}
            <div className={styles.actions}>
              <StyledButton type="submit">
                <Icon name="Save" />
              </StyledButton>
              <StyledButton onClick={handleClick}>
                <Icon name="XCircle" />
              </StyledButton>
            </div>
          </div>
        </Header>
        <Item
          property="name"
          label="Blog Name"
          value={props.settings.name}
          readOnly={false}
        />
        <Item
          property="summary"
          label="Blog Summary"
          value={props.settings.summary}
          readOnly={false}
        />
      </form>
    );
  }
}

function Item<K extends keyof BlogSettings>(props: {
  property: K;
  value: BlogSettings[K];
  label: string;
  readOnly: boolean;
}) {
  return (
    <div className={styles.item_container}>
      <label htmlFor={props.property} className={styles.item_label}>
        {props.label}
      </label>
      <div className={styles.item_value}>
        {props.readOnly ? (
          <div>{props.value}</div>
        ) : (
          <input
            type="text"
            defaultValue={props.value}
            className={styles.item_input}
            name={props.property}
            id={props.property}
          />
        )}
      </div>
    </div>
  );
}
