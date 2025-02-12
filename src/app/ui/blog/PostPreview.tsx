import { Post } from '@/src/app/lib/definitions';
import styles from './PostPreview.module.css';
import Link from 'next/link';

export default function PostPreview({ post }: { post: Post }) {
  // bug: post data is rendered as one day before date string
  console.log(post.data.date);
  return (
    <article className={styles.article}>
      <Link href={`/blog/${post.data.slug}`} className={styles.title}>
        <h3>{post.data.title}</h3>
      </Link>
      {post.data.excerpt && <p>{post.data.excerpt}</p>}
      <p className={styles.byline}>
        By {post.data.author}
        <span className={styles.span}>--</span>
        {new Date(post.data.date).toDateString()}
      </p>
    </article>
  );
}
