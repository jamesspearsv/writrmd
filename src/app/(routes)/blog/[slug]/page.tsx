import { fetchPostBySlug } from '@/src/app/lib/actions';
import { notFound } from 'next/navigation';
import Post from '@/src/app/ui/posts/Post';
import { Silkscreen } from 'next/font/google';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;
  const file = await fetchPostBySlug(slug);

  // return 404 if file is null
  if (!file) notFound();

  return (
    <main>
      <Post slug={slug} />
    </main>
  );
}
