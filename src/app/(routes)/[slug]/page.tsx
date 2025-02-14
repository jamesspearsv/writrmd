import { fetchPage } from '@/src/app/lib/actions';
import { console } from 'inspector';
import Markdown from 'marked-react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const page = await fetchPage(slug);
  console.log(page);

  if (page) {
    return {
      title: page.data.title,
    };
  }

  return {};
}

export default async function Page({ params }: PageProps) {
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
