import Post from '@/src/app/ui/blog/Post';
import Breadcrumbs from '@/src/app/ui/common/Breadcrumbs';

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  return (
    <main>
      <Breadcrumbs />
      <Post slug={slug} />
    </main>
  );
}
