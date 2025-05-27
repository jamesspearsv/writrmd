import { PostFile } from '@/app/lib/definitions';
import PostPreview from '@/app/ui/posts/PostPreview';
import styles from './PostList.module.css';

export default async function PostList(props: { posts: PostFile[] }) {
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
