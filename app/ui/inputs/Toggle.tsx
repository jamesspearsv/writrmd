'use client';

import styles from './Toggle.module.css';
import clsx from 'clsx';
import { CommonInputProps } from '@/app/lib/definitions';

interface ToggleProps extends CommonInputProps<boolean> {
  toggleOffLabel: string;
  toggleOnLabel: string;
}

// todo: add input props and controller
export default function Toggle(props: ToggleProps) {
  const toggled = props.controller.value;

  return (
    <div className={styles.container}>
      <button
        className={clsx(
          `${styles.toggleContainer}`,
          toggled && `${styles.toggled}`
        )}
        onClick={() => {
          const { key, updateValue } = props.controller;
          updateValue(key, !toggled);
        }}
      >
        <div
          className={clsx(
            `${styles.toggleIndicator}`,
            toggled && `${styles.toggled}`
          )}
        ></div>
      </button>
      <p>{toggled ? props.toggleOnLabel : props.toggleOffLabel}</p>
    </div>
  );
}
