import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>We&apos;re having trouble finding that post</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
