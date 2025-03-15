'use client';

import { updateSettingValue } from '@/app/lib/actions';
import { BlogSettings } from '@/app/lib/definitions';
import StyledButton from '@/app/ui/common/StyledButton';
import React, { startTransition, useEffect, useState } from 'react';
import { Edit, Save, XCircle } from 'react-feather';
import styles from './SettingsItem.module.css';

export default function SettingsItem<K extends keyof BlogSettings>(props: {
  property: K;
  value: BlogSettings[K];
  label: string;
  editor?: boolean;
}) {
  const iconSize = 16;
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  useEffect(() => {
    setValue(props.value);
  }, [props.value]);

  function cancelEdit() {
    setValue(props.value);
    setEditing(false);
  }

  function submitChange() {
    startTransition(async () => {
      await updateSettingValue(props.property, value);
      setEditing(false);
    });
  }

  function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      submitChange();
    }

    if (e.key === 'Escape') {
      cancelEdit();
    }
  }

  return (
    <div>
      <div className={styles.item_heading}>
        <h3 className={styles.property}>{props.label}</h3>
        <div className={styles.item_actions}>
          {!editing ? (
            <StyledButton
              onClick={() => setEditing(true)}
              className={styles.action_button}
            >
              <Edit size={iconSize} />
            </StyledButton>
          ) : (
            <>
              <StyledButton
                onClick={submitChange}
                className={styles.action_button}
              >
                <Save size={iconSize} />
              </StyledButton>
              <StyledButton
                onClick={cancelEdit}
                className={styles.action_button}
              >
                <XCircle size={iconSize} />
              </StyledButton>
            </>
          )}
        </div>
      </div>
      <div className={styles.item_value}>
        {!editing ? (
          <div>{props.value}</div>
        ) : (
          <input
            className={styles.item_input}
            type="text"
            value={value}
            onKeyDown={handleKeyPress}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
        )}
      </div>
    </div>
  );
}
