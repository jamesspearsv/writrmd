import AdminPostPreview from '@/app/ui/posts/PostAdminPreview';
import Header from '@/app/ui/common/Header';
import { selectPosts } from '@/app/db/queries';

export default async function Page() {
  const rows = await selectPosts({});

  rows.forEach((row) => console.log(row));

  return (
    <>
      <Header>
        <h1>All Posts</h1>
      </Header>
      <section>
        {rows.map((post, index) => (
          <AdminPostPreview key={index} post={post} />
        ))}
      </section>
    </>
  );
}
