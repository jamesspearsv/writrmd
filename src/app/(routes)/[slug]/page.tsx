import { fetchPage } from '@/src/app/lib/actions';
import Markdown from 'marked-react';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  const page = await fetchPage(slug);

  // todo: improve error handling with notFound
  if (!page) notFound();

  return (
    <main>
      <Markdown>{page.content}</Markdown>
    </main>
  );
}
