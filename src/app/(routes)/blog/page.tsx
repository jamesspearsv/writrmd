import { fetchPosts } from '@/src/app/lib/actions';
import PostList from '@/src/app/ui/posts/PostList';
import PlaceholderPage from '@/src/app/ui/common/PlaceholderPage';

export default async function BlogPage() {
  const posts = await fetchPosts();

  if (!posts) return <PlaceholderPage />;

  return (
    <main>
      <PostList posts={posts} />
    </main>
  );
}
