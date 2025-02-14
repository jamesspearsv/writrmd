import './globals.css';
import type { Metadata } from 'next';
import { inter } from '@/src/app/ui/fonts';
import ThemeProvider from '@/src/app/ui/themes/ThemeProvider';

/* 
# FORCE REVALIDATION ON EACH REQUEST FOR ALL PAGES
# This ensures new files from the posts and pages dirs
# are read without needing to rebuild the app or image 
*/
export const revalidate = 0;

export const metadata: Metadata = {
  title: {
    default: 'Writr.md',
    template: 'Writr.md | %s',
  },
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
