'use client';

import clsx from 'clsx';
import styles from './Input.module.css';
import { CommonInputProps } from '@/app/lib/definitions';

interface InputProps extends CommonInputProps<string> {
  label?: string;
  variant?: 'normal' | 'borderless';
  size?: 'small' | 'medium' | 'large';
}

export default function Input({
  variant = 'normal',
  size = 'small',
  ...props
}: InputProps) {
  return (
    <div className={styles.group}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        className={clsx(
          `${styles.input}`,
          `${styles[variant]}`,
          `${styles[size]}`,
          props.error && `${styles.error}`
        )}
        placeholder={props.placeholder}
        type="text"
        name={props.name}
        id={props.name}
        aria-label={props.name}
        autoComplete="off"
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
