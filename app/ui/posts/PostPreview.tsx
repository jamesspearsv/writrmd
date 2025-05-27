import styles from './PostPreview.module.css';
import Link from 'next/link';
import { Post } from '@/app/lib/types';

export default function PostPreview(props: {
  post: Post;
  variant: 'minimal' | 'full';
}) {
  const { post } = props;

  if (props.variant === 'full') {
    return (
      <article className={styles.full}>
        <div className={styles.title}>
          <Link href={`/blog/${post.slug}`}>
            <h2>{post.title}</h2>
          </Link>
        </div>
        {post.excerpt && <p>{post.excerpt}</p>}
        <p className={styles.byline}>{new Date(post.date!).toDateString()}</p>
      </article>
    );
  }

  if (props.variant === 'minimal') {
    return (
      <Link className={styles.post_link} href={`/blog/${post.slug}`}>
        <article className={styles.minimal}>
          <div>{post.title}</div>
          <div>{new Date(post.date!).toDateString()}</div>
        </article>
      </Link>
    );
  }
}
