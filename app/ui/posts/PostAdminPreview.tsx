import styles from './PostAdminPreview.module.css';
import Link from 'next/link';
import clsx from 'clsx';
import { Post } from '@/app/lib/types';

export default function AdminPostPreview(props: { post: Post }) {
  const { post } = props;

  return (
    <article className={styles.article}>
      <div className={styles.heading}>
        <Link href={`/writr/edit/${post.slug}`}>
          <h2>{post.title}</h2>
        </Link>
      </div>
      <div className={styles.details}>
        {post.published ? (
          <p className={clsx(`${styles.status}`, `${styles.published}`)}>
            Published
          </p>
        ) : (
          <p className={clsx(`${styles.status}`, `${styles.draft}`)}>Draft</p>
        )}
        {post.date && <div>{new Date(post.date).toDateString()}</div>}
        {post.tags && (
          <div className={styles.tags}>
            {post.tags.length > 0 && <p>Tags:</p>}
            {post.tags?.split(',').map((tag) => (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
