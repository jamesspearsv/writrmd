'use client';

import clsx from 'clsx';
import styles from './Input.module.css';
import { CommonInputProps } from '@/app/lib/definitions';

interface InputProps extends CommonInputProps {
  label?: string;
  variant?: 'normal' | 'borderless';
}

export default function Input({ variant = 'normal', ...props }: InputProps) {
  return (
    <div className={styles.group}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
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
        aria-label={props.name}
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
