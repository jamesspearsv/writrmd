import PostPreview from '@/app/ui/posts/PostPreview';
import styles from './PostList.module.css';
import { Post } from '@/app/lib/types';

export default async function PostList(props: { posts: Post[] }) {
  const { posts } = props;
  return (
    <section className={styles.section}>
      {posts.length > 0 &&
        posts.map((post, index) => (
          <PostPreview key={index} post={post} variant="full" />
        ))}
    </section>
  );
}
