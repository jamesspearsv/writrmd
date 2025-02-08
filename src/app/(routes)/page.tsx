import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <p>home page</p>
      <Link href={'/blog'}>Blog</Link>
    </main>
  );
}
