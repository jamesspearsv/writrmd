import { fetchPostBySlug } from '@/app/lib/actions';
import Post from '@/app/ui/blog/Post';
import Breadcrumbs from '@/app/ui/common/Breadcrumbs';
import ScrollBack from '@/app/ui/common/ScrollBack';
import { Metadata } from 'next';

type PostProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await fetchPostBySlug(slug);

  if (post) {
    return {
      title: post.data.title,
      description: post.data.excerpt,
    };
  }

  return {};
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <>
      <main>
        <Breadcrumbs />
        <Post slug={slug} />
      </main>
      <ScrollBack />
    </>
  );
}
