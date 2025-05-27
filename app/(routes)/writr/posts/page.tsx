import { fetchAllPosts } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
import AdminPostPreview from '@/app/ui/posts/PostAdminPreview';
import Header from '@/app/ui/common/Header';
import PlaceholderPage from '@/app/ui/common/PlaceholderPage';
import Link from 'next/link';
import { selectPosts } from '@/app/db/queries';

export default async function Page() {
  const posts = await fetchAllPosts({ publishedOnly: false });
  const rows = await selectPosts();

  if (!posts.success) return notFound();
  if (posts.data.length === 0) return <PlaceholderPage />;

  rows.forEach((row) => console.log(row));

  return (
    <>
      <Header>
        <h1>All Posts</h1>
      </Header>
      <section style={{ display: 'flex', flexDirection: 'column' }}>
        {rows.map((row) => (
          <Link key={row.id} href={`/writr/edit/${row.id}`}>
            {row.title}
          </Link>
        ))}
      </section>
      <hr />
      <section>
        {posts.data.map((post, index) => (
          <AdminPostPreview key={index} post={post} />
        ))}
      </section>
    </>
  );
}
