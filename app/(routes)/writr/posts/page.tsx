import { fetchAllPosts } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
import AdminPostPreview from '@/app/ui/posts/PostAdminPreview';
import Header from '@/app/ui/common/Header';
import PlaceholderPage from '@/app/ui/common/PlaceholderPage';

export default async function Page() {
  const posts = await fetchAllPosts({ publishedOnly: false });

  if (!posts.success) return notFound();
  if (posts.data.length === 0) return <PlaceholderPage />;

  return (
    <>
      <Header>
        <h1>All Posts</h1>
      </Header>
      <section>
        {posts.data.map((post, index) => (
          <AdminPostPreview key={index} post={post} />
        ))}
      </section>
    </>
  );
}
