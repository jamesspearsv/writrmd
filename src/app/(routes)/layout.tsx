import './globals.css';
import type { Metadata } from 'next';
import { inter } from '@/src/app/ui/fonts';
import ThemeProvider from '@/src/app/ui/ThemeProvider';
import Nav from '../ui/nav/Nav';
import ThemePicker from '@/src/app/ui/nav/ThemePicker';

export const revalidate = 0;

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
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <ThemeProvider>
          <nav>
            <Nav />
            <ThemePicker />
          </nav>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
