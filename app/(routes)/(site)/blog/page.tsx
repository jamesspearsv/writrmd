import { Metadata } from 'next';
import { fetchPosts } from '@/app/lib/actions';
import PostList from '@/app/ui/blog/PostList';
import PlaceholderPage from '@/app/ui/common/PlaceholderPage';

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  let tag = (await searchParams).tag;
  if (typeof tag === 'object') tag = tag[0];
  if (tag) {
    return {
      title: `${tag} posts`,
    };
  }

  return {
    title: 'All Posts',
  };
}

export default async function BlogPage({ searchParams }: Props) {
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
