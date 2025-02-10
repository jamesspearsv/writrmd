import { fetchPosts } from '@/src/app/lib/actions';
import { Post } from '@/src/app/lib/definitions';
import PostPreview from '@/src/app/ui/posts/PostPreview';
import styles from './PostList.module.css';
import PlaceholderPage from '@/src/app/ui/common/PlaceholderPage';

export default async function PostList() {
  const posts: Post[] | null = await fetchPosts();

  // todo: add error handling if unable to fetch posts
  // todo: evaluate if this should be a client or server component
  if (!posts || posts.length < 1) return <PlaceholderPage />;

  return (
    <section className={styles.section}>
      {posts.map((post, index) => (
        <PostPreview key={index} post={post} />
      ))}
    </section>
  );
}
