'use client';

import { GenericInputProps } from '@/app/lib/definitions';
import StyledButton from '@/app/ui/common/StyledButton';
import { X, Plus } from 'react-feather';
import styles from './ListInput.module.css';
import { useState } from 'react';

// todo: add type safety to ensure limit is positive whole number
interface ListInputProps extends GenericInputProps {
  limit: number;
  value: string[];
}

export default function ListInput(props: ListInputProps) {
  const [tagState, setTagState] = useState('');

  function handleListAddition() {
    const newData = [...props.value];
    newData.push(tagState);
    props.updateValue(props.name, newData);
    setTagState('');
  }

  function handleListDeletion(index: number) {
    const l = [...props.value];
    l.splice(index, 1);
    props.updateValue(props.name, l);
  }

  return (
    <div className={styles.group}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={styles.itemInput}>
        <input
          type="text"
          name={'tag'}
          id={'tag'}
          value={tagState}
          onChange={(e) => setTagState(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleListAddition()}
        />
        <StyledButton className={styles.addButton} onClick={handleListAddition}>
          <Plus />
        </StyledButton>
      </div>
      <div className={styles.items}>
        {props.value.length === 0 ? (
          <p className={styles.listPlaceholder}>
            Add some items to get started...
          </p>
        ) : (
          props.value.map((item, index) => (
            <div key={index} className={styles.item}>
              <p>{item}</p>
              <StyledButton
                className={styles.removeButton}
                onClick={() => {
                  handleListDeletion(index);
                }}
              >
                <X size={14} />
              </StyledButton>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
