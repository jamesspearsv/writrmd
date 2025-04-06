import { Metadata } from 'next';
import { fetchPosts } from '@/app/lib/actions';
import PostList from '@/app/ui/posts/PostList';
import PlaceholderPage from '@/app/ui/common/PlaceholderPage';

type Props = {
  searchParams: Promise<{ tag: string }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const tag = (await searchParams).tag;
  console.log(typeof tag);
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
  const posts = await fetchPosts(tag);

  if (!posts) return <PlaceholderPage />;

  const publishedPosts = posts.filter((post) => post.data.published);

  return (
    <>
      <PostList posts={publishedPosts} />
    </>
  );
}
