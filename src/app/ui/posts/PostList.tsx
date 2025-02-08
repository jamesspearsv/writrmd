import { fetchPosts } from '@/src/app/lib/actions';
import { Post } from '@/src/app/lib/definitions';
import PostPreview from '@/src/app/ui/posts/PostPreview';
import styles from './PostList.module.css';

export default async function PostList() {
  const posts: Post[] | null = await fetchPosts();

  // todo: add error handling if unable to fetch posts
  if (!posts) return null;

  return (
    <section className={styles.section}>
      {posts.map((post, index) => (
        <PostPreview key={index} post={post} />
      ))}
    </section>
  );
}
