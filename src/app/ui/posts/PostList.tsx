import { Post } from '@/src/app/lib/definitions';
import PostPreview from '@/src/app/ui/posts/PostPreview';
import styles from './PostList.module.css';

export default async function PostList({ posts }: { posts: Post[] }) {
  return (
    <section className={styles.section}>
      {posts.length > 0 &&
        posts.map((post, index) => <PostPreview key={index} post={post} />)}
    </section>
  );
}
