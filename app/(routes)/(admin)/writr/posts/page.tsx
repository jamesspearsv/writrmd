import { fetchPosts } from '@/app/lib/actions';
import { Plus } from 'react-feather';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PostList from '@/app/ui/blog/PostList';
import StyledButton from '@/app/ui/common/StyledButton';
import styles from './page.module.css';

export default async function Page() {
  const posts = await fetchPosts();

  if (!posts) return notFound();

  return (
    <main>
      <PostList posts={posts} admin={true} />
      <Link href={'/writr/posts/new'}>
        <StyledButton variation={'circle'} className={styles.button}>
          <Plus />
        </StyledButton>
      </Link>
    </main>
  );
}
