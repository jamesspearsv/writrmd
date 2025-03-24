import { fetchPosts } from '@/app/lib/actions';
import { Plus } from 'react-feather';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import StyledButton from '@/app/ui/common/StyledButton';
import styles from './page.module.css';
import AdminPostPreview from '@/app/ui/posts/PostAdminPreview';

export default async function Page() {
  const posts = await fetchPosts();

  if (!posts) return notFound();

  return (
    <main>
      <section>
        {posts.map((post, index) => (
          <AdminPostPreview key={index} post={post} />
        ))}
      </section>
      <Link href={'/writr/editor/post'}>
        <StyledButton variation={'circle'} className={styles.button}>
          <Plus />
        </StyledButton>
      </Link>
    </main>
  );
}
