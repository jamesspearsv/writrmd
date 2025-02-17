'use client';

import { InputProps } from '@/app/lib/definitions';
import StyledButton from '@/app/ui/common/StyledButton';
import { useRef, useState } from 'react';
import { X, Plus } from 'react-feather';
import styles from './ListInput.module.css';

// todo: add type safety to ensure limit is a positive whole number
interface ListInputProps extends InputProps {
  limit: number;
}

export default function ListInput(props: ListInputProps) {
  const tagRef = useRef<HTMLInputElement | null>(null);
  const [list, setList] = useState<string[]>(() => {
    if (!props.value) return ['tag'];
    const items = props.value.split(',');
    return items;
  });

  function pushToList() {
    if (list.length >= props.limit) return;

    const l = [...list];
    if (!tagRef || !tagRef.current?.value) return;
    l.push(tagRef.current.value);
    setList(l);
    tagRef.current.value = '';
  }

  function handleInputChange(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') pushToList();
  }

  function addToList(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    pushToList();
  }

  function deleteFromList(
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) {
    e.preventDefault();
    const l = [...list];
    l.splice(index, 1);
    setList(l);
  }

  return (
    <div className={styles.group}>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="hidden" value={list} name={props.name} id={props.name} />
      <div className={styles.itemInput}>
        <input
          type="text"
          name="list"
          ref={tagRef}
          disabled={list.length === props.limit}
          onKeyDown={handleInputChange}
        />
        <StyledButton onClick={addToList} className={styles.addButton}>
          <Plus />
        </StyledButton>
      </div>
      <div className={styles.items}>
        {list.length === 0 ? (
          <p className={styles.listPlaceholder}>
            Add some items to get started...
          </p>
        ) : (
          list.map((item, index) => (
            <div key={index} className={styles.item}>
              <p>{item}</p>
              <StyledButton
                className={styles.removeButton}
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  console.log(e);
                  deleteFromList(e, index);
                }}
              >
                <X size={12} />
              </StyledButton>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
