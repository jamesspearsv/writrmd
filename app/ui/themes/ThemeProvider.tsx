'use client';

import { useMountCheck } from '@/app/lib/hooks';
import Script from 'next/script';
import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';

export interface UseThemeProps {
  theme: 'light' | 'dark' | undefined;
  updateTheme: () => void;
}

export const ThemeContext = createContext<UseThemeProps>({
  theme: 'light',
  updateTheme: () => {},
});

// useTheme hook
export function useTheme() {
  const { theme, updateTheme } = useContext(ThemeContext);
  return { theme, updateTheme };
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const mounted = useMountCheck();
  const [theme, setTheme] = useState<UseThemeProps['theme']>(() => {
    if (typeof window !== 'undefined') {
      const theme = localStorage.getItem('writrmd-theme');
      if (!theme || (theme !== 'light' && theme !== 'dark')) return 'light';
      return theme;
    }
    return undefined;
  });

  useEffect(() => {
    if (theme === undefined) return;
    // update html element data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    // store new theme in local storage
    localStorage.setItem('writrmd-theme', theme);
  }, [theme]);

  function updateTheme() {
    if (theme === 'dark') setTheme('light');
    if (theme === 'light') setTheme('dark');
  }

  if (!mounted) return null;

  return (
    <>
      {/* Ensure theme is read when content is rendered from server */}
      <Script id="load-theme">
        {`(() => {
          if (!localStorage.getItem('writrmd-theme')) {
            localStorage.setItem('writrmd-theme', 'light')
          }
          const theme = localStorage.getItem('writrmd-theme')
          document.documentElement.setAttribute('data-theme', theme)
        })();`}
      </Script>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        {children}
      </ThemeContext.Provider>
    </>
  );
}
