import { Post } from '@/app/lib/definitions';
import PostPreview from '@/app/ui/blog/PostPreview';
import styles from './PostList.module.css';

export default async function PostList({
  posts,
  admin,
}: {
  posts: Post[];
  admin?: boolean;
}) {
  return (
    <section className={styles.section}>
      {posts.length > 0 &&
        posts.map((post, index) => (
          <PostPreview key={index} post={post} admin={admin} />
        ))}
    </section>
  );
}
