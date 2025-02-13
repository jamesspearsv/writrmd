import { fetchPosts } from '@/src/app/lib/actions';
import PostList from '@/src/app/ui/blog/PostList';
import PlaceholderPage from '@/src/app/ui/common/PlaceholderPage';

export const revalidate = 0;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  let tag = (await searchParams).tag;
  if (typeof tag === 'object') tag = tag[0]; // select first tag if an array
  const posts = await fetchPosts(tag);

  if (!posts) return <PlaceholderPage />;

  return (
    <main>
      {/* todo: add filtering options to blog page */}
      <PostList posts={posts} />
    </main>
  );
}
