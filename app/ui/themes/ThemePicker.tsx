'use client';

import { useTheme } from '@/app/ui/themes/ThemeProvider';
import styles from './ThemePicker.module.css';
import { Moon, Sun } from 'react-feather';
import clsx from 'clsx';

export default function ThemePicker({ alt }: { alt?: boolean }) {
  const { theme, updateTheme } = useTheme();
  const size = 22;

  return (
    <button
      className={clsx(`${styles.button}`, alt && `${styles.alt}`)}
      onClick={() => {
        if (theme === 'dark') {
          updateTheme('light');
        } else if (theme === 'light') {
          updateTheme('dark');
        }
      }}
    >
      <div>
        {theme === 'light' ? <Moon size={size} /> : <Sun size={size} />}
      </div>
    </button>
  );
}
