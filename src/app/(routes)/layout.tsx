import './globals.css';
import { inter } from '@/src/app/ui/fonts';
import type { Metadata } from 'next';
import Nav from '../ui/nav/Nav';
import ThemePicker from '@/src/app/ui/nav/ThemePicker';

export const revalidate = 0;

/*
POTENTIAL SOLUTION TO THEMING WITH SERVER COMPONENTS
Pass your app as a children prop to your theme provider. The rest of the app can still render on the server.

SOURCE: https://www.reddit.com/r/nextjs/comments/198ua08/does_lightdark_theme_in_nextjs_breaks_ssr/

'use client'

export default function ThemeProvider({ children }) { return ( <> {children} </> ) }

<ThemeProvider> <ServerComponent /> </ThemeProvider>

Here’s an example with shadcn

More in depth explanation from Nextjs doc
*/

export const metadata: Metadata = {
  title: 'Writr.md',
  icons: '/icon.png',
  description: 'Markdown blogging platform built with Nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme: 'light' | 'dark' = 'dark';

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <nav>
          <Nav />
          <ThemePicker />
        </nav>
        {theme}
        {children}
      </body>
    </html>
  );
}
