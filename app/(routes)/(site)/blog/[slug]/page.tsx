import { fetchPost } from '@/app/lib/actions';
import Post from '@/app/ui/posts/Post';
import ScrollBack from '@/app/ui/common/ScrollBack';
import { Metadata } from 'next';

type PostProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const slug = (await params).slug;
  const result = await fetchPost(slug);

  if (result.success) {
    return {
      title: result.data.data.title,
      description: result.data.excerpt,
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
      {/* <Breadcrumbs /> */}
      <Post slug={slug} />
      <ScrollBack />
    </>
  );
}
