import { fetchPosts } from '@/app/lib/actions';
import { Plus } from 'react-feather';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import StyledButton from '@/app/ui/common/StyledButton';
import AdminPostPreview from '@/app/ui/posts/PostAdminPreview';
import styles from './page.module.css';
import Header from '@/app/ui/common/Header';

export default async function Page() {
  const posts = await fetchPosts();

  if (!posts) return notFound();

  return (
    <>
      <Header>
        <h1>All Posts</h1>
      </Header>
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
    </>
  );
}
