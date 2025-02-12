import { fetchPosts } from '@/src/app/lib/actions';
import PostList from '@/src/app/ui/blog/PostList';
import PlaceholderPage from '@/src/app/ui/common/PlaceholderPage';

export const revalidate = 0;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const tag = (await searchParams).tag;
  const posts = await fetchPosts(tag);

  if (!posts) return <PlaceholderPage />;

  return (
    <main>
      <PostList posts={posts} />
    </main>
  );
}
