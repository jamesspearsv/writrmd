'use client';

import { CommonInputProps } from '@/app/lib/definitions';
import { useState } from 'react';
import styles from './List.module.css';
import StyledButton from '@/app/ui/common/StyledButton';
import { Plus, X } from 'react-feather';
import clsx from 'clsx';

interface ListProps extends CommonInputProps<string[]> {
  label: string;
  limit: number;
}

// todo: add list functions
function handleListAddition() {}
function handleListDeletion(index: number) {}

export default function List(props: ListProps) {
  const [tagState, setTagState] = useState('');

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
          className={clsx(props.error && `styles.error`)}
        />
        <StyledButton className={styles.addButton} onClick={handleListAddition}>
          <Plus />
        </StyledButton>
      </div>
      {props.error && <div className={styles.error}>{props.error}</div>}
      <div className={styles.items}>
        {props.controller.value.length === 0 ? (
          <p className={styles.listPlaceholder}>
            Add some items to get started...
          </p>
        ) : (
          props.controller.value.map((item, index) => (
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
