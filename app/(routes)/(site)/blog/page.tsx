import { Metadata } from 'next';
import { fetchAllPosts } from '@/app/lib/actions';
import PostList from '@/app/ui/posts/PostList';
import PlaceholderPage from '@/app/ui/common/PlaceholderPage';

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
  const posts = await fetchAllPosts({ tag, publishedOnly: true });

  if (!posts.success) return <PlaceholderPage />;

  return (
    <>
      <PostList posts={posts.data} />
    </>
  );
}
