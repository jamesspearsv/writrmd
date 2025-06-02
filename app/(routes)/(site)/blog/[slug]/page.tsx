import Post from '@/app/ui/posts/Post';
import ScrollBack from '@/app/ui/common/ScrollBack';
import { Metadata } from 'next';
import { selectPosts } from '@/app/db/queries';

type PostProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: PostProps): Promise<Metadata> {
  const slug = (await params).slug;
  const post = (await selectPosts({ slug }))[0];

  return {
    title: post.title,
    description: post.excerpt,
  };
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
