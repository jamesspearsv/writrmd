'use client';

import {
  ThemeContext,
  ThemeContextInterface,
} from '@/src/app/ui/ThemeProvider';
import { Button } from '@ariakit/react';
import { useContext } from 'react';

export default function ThemePicker() {
  const { theme, updateTheme } = useContext(
    ThemeContext
  ) as ThemeContextInterface;
  console.log(theme);

  return (
    <Button
      onClick={() => {
        if (theme === 'dark') {
          updateTheme('light');
        } else if (theme === 'light') {
          updateTheme('dark');
        }
      }}
    >
      Toggle Theme
    </Button>
  );
}
