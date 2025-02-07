import type { Metadata } from 'next';
import './globals.css';
import Nav from '../ui/nav/Nav';

export const metadata: Metadata = {
  title: 'MDwritr',
  description: 'Markdown blogging platform built with Nextjs',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
