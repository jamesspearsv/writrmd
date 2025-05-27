import { PostFile } from '@/app/lib/definitions';
import styles from './PostPreview.module.css';
import Link from 'next/link';

export default function PostPreview(props: {
  post: PostFile;
  variant: 'minimal' | 'full';
}) {
  const { post } = props;

  if (props.variant === 'full') {
    return (
      <article className={styles.full}>
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

  if (props.variant === 'minimal') {
    return (
      <Link className={styles.post_link} href={`/blog/${post.data.slug}`}>
        <article className={styles.minimal}>
          <div>{post.data.title}</div>
          <div>{new Date(post.data.date).toDateString()}</div>
        </article>
      </Link>
    );
  }
}
