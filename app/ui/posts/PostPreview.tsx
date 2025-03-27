import { Post } from '@/app/lib/definitions';
import styles from './PostPreview.module.css';
import Link from 'next/link';

export default function PostPreview(props: { post: Post }) {
  const { post } = props;

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
