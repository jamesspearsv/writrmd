'use client';

import { useTheme } from '@/app/ui/themes/ThemeProvider';
import styles from './ThemePicker.module.css';
import { Moon, Sun } from 'react-feather';
import clsx from 'clsx';
import { useMountCheck } from '@/app/lib/hooks';

export default function ThemePicker({ alt }: { alt?: boolean }) {
  const mounted = useMountCheck();
  const { theme, updateTheme } = useTheme();
  const size = 22;

  if (!mounted) return null;

  return (
    <button
      className={clsx(`${styles.button}`, alt && `${styles.alt}`)}
      onClick={updateTheme}
    >
      <div>
        {theme === 'light' ? <Moon size={size} /> : <Sun size={size} />}
      </div>
    </button>
  );
}
