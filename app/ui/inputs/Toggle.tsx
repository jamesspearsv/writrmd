'use client';

import { useState } from 'react';
import styles from './Toggle.module.css';
import clsx from 'clsx';

// todo: add input props and controller
export default function Toggle() {
  const [toggled, setToggled] = useState(false);

  return (
    <button
      className={styles.toggleContainer}
      onClick={() => setToggled((toggled) => !toggled)}
    >
      <button
        className={clsx(
          `${styles.toggleIndicator}`,
          toggled && `${styles.toggled}`
        )}
      ></button>
    </button>
  );
}
