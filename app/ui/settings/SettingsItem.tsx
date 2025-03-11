'use client';

import { updateSettingValue } from '@/app/lib/actions';
import { BlogSettings } from '@/app/lib/definitions';
import StyledButton from '@/app/ui/common/StyledButton';
import React, { startTransition, useEffect, useState } from 'react';
import { Edit, Save, XCircle } from 'react-feather';

/* TODO
 Consider if using useState and a server action is the best approach? 
 Things to consider:

 - Potential benefits of using useActionState
 - Does it make sense for each input to manage it's own state?
 */

export default function SettingsItem<K extends keyof BlogSettings>(props: {
  property: K;
  value: BlogSettings[K];
}) {
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

  return (
    <div>
      <p>{props.property}</p>
      {!editing ? (
        <div>
          <div>{props.value}</div>
          <StyledButton onClick={() => setEditing(true)}>
            <Edit size={14} />
          </StyledButton>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.currentTarget.value)}
          />
          <div>
            <StyledButton onClick={submitChange}>
              <Save size={14} />
            </StyledButton>
            <StyledButton onClick={cancelEdit}>
              <XCircle size={14} />
            </StyledButton>
          </div>
        </div>
      )}
    </div>
  );
}
