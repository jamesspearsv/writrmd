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

export default function List(props: ListProps) {
  const [tag, setTag] = useState('');

  function handleListAddition() {
    const { key, value, updateValue } = props.controller;

    if (value.length >= props.limit) return;

    const list = [...value];
    list.push(tag);
    updateValue(key, list);
    setTag('');
  }

  function handleListDeletion(index: number) {
    const { key, value, updateValue } = props.controller;
    const list = [...value].toSpliced(index, 1);
    updateValue(key, list);
  }

  return (
    <div className={styles.group}>
      <label htmlFor={props.name}>{props.label}</label>
      <div className={styles.itemInput}>
        <input
          type="text"
          name={'tag'}
          id={'tag'}
          value={tag}
          onChange={(e) => setTag(e.currentTarget.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleListAddition()}
          className={clsx(props.error && `styles.error`)}
          disabled={props.controller.value.length >= props.limit}
        />
        <StyledButton
          className={styles.addButton}
          onClick={handleListAddition}
          disabled={props.controller.value.length >= props.limit}
        >
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
