'use client';

import Script from 'next/script';
import {
  ReactNode,
  useState,
  createContext,
  useContext,
  useEffect,
} from 'react';

export interface ThemeContextInterface {
  theme: 'light' | 'dark';
  updateTheme: (theme: 'light' | 'dark') => void;
}

// init theme context
export const ThemeContext = createContext<ThemeContextInterface>({
  theme: 'light',
  updateTheme: () => {},
});

// useTheme custom hook
export function useTheme() {
  const { theme, updateTheme } = useContext(ThemeContext);

  return { theme, updateTheme };
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const theme = localStorage.getItem('writrmd-theme');
    if (!theme || (theme !== 'light' && theme !== 'dark')) return 'light';
    return theme;
  });
  // const pathname = usePathname();
  // const router = useRouter();

  useEffect(() => {
    // update html element data-theme attribute
    document.documentElement.setAttribute('data-theme', theme);
    // store new theme in local storage
    localStorage.setItem('writrmd-theme', theme);
  }, [theme]);

  function updateTheme(newTheme: 'light' | 'dark') {
    setTheme(newTheme);
    // router.replace(pathname ? pathname : '/');
  }

  return (
    <>
      {/* Ensure theme is read when content is rendered from server */}
      <Script id="load-theme" strategy={'beforeInteractive'}>
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
