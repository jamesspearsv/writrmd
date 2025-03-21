'use client';

import clsx from 'clsx';
import styles from './Input.module.css';
import { NewGenericInputProps } from '@/app/lib/definitions';

interface InputProps<T> extends NewGenericInputProps<T> {
  label: string;
  variant?: 'normal' | 'borderless';
}

export default function Input<T>({
  variant = 'normal',
  ...props
}: InputProps<T>) {
  if (typeof props.name !== 'string') return;

  return (
    <div className={styles.group}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className={clsx(
          `${styles.input}`,
          `${styles[variant]}`,
          props.error && `${styles.error}`
        )}
        placeholder={props.placeholder}
        type="text"
        name={props.name}
        id={props.name}
        value={props.controller.value}
        onChange={(e) => {
          props.controller.updateValue(
            props.controller.key,
            e.currentTarget.value
          );
        }}
      />
    </div>
  );
}
