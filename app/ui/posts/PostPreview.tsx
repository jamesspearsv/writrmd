import { Post } from '@/app/lib/definitions';
import styles from './PostPreview.module.css';
import Link from 'next/link';

export default function PostPreview(props: { post: Post }) {
  const { post } = props;

  return (
    <article className={styles.article}>
      <div className={styles.title}>
        <Link href={`/blog/${post.data.slug}`}>
          <h2>{post.data.title}</h2>
        </Link>
      </div>
      {post.data.excerpt && <p>{post.data.excerpt}</p>}
      <p className={styles.byline}>
        By {post.data.author}
        <span className={styles.span}>--</span>
        {new Date(post.data.date).toDateString()}
      </p>
    </article>
  );
}
