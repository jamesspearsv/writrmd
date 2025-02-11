'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ReactNode, useState, createContext, useEffect } from 'react';

export interface ThemeContextInterface {
  theme: 'light' | 'dark';
  updateTheme: (theme: 'light' | 'dark') => void;
}

export const ThemeContext = createContext<ThemeContextInterface | null>(null);

// todo: move theme storage to local storage and read with a prerender script
export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function updateTheme(newTheme: 'light' | 'dark') {
    setTheme(newTheme);
    router.replace(pathname ? pathname : '/');
  }

  return (
    <ThemeContext.Provider value={{ theme, updateTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
