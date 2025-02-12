'use client';

import { useTheme } from '@/src/app/ui/themes/ThemeProvider';
import { Button } from '@ariakit/react';
import styles from './ThemePicker.module.css';
import { Moon, Sun } from 'react-feather';

export default function ThemePicker() {
  const { theme, updateTheme } = useTheme();
  const size = 22;

  return (
    <Button
      className={styles.button}
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
    </Button>
  );
}
