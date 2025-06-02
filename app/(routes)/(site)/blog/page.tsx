import { Metadata } from 'next';
import PostList from '@/app/ui/posts/PostList';
import { selectPosts } from '@/app/db/queries';

type Props = {
  searchParams: Promise<{ tag: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const tag = (await searchParams).tag;
  if (typeof tag === 'string') {
    if (tag) {
      return {
        title: `${tag} posts`,
      };
    }
  }

  return {
    title: 'All Posts',
  };
}

export default async function BlogPage({ searchParams }: Props) {
  const tag = (await searchParams).tag;
  console.log(tag);
  const posts = await selectPosts({ published: true });

  // if (!posts.success) return <PlaceholderPage />;

  return (
    <>
      <PostList posts={posts} />
    </>
  );
}
