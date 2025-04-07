import { Post } from '@/app/lib/definitions';
import styles from './PostAdminPreview.module.css';
import Link from 'next/link';
import clsx from 'clsx';

export default function AdminPostPreview(props: { post: Post }) {
  const { post } = props;

  return (
    <article className={styles.article}>
      <div className={styles.heading}>
        <Link href={`/writr/editor/post?slug=${post.data.slug}`}>
          <h2>{post.data.title}</h2>
        </Link>
      </div>
      <div className={styles.details}>
        <p>By {post.data.author}</p>
        <p>-</p>
        <p>
          {post.data.date
            ? new Date(post.data.date).toDateString()
            : 'Unpublished'}
        </p>
        {post.data.tags && (
          <div className={styles.tags}>
            {post.data.tags.length > 0 && <p>Tags:</p>}
            {post.data.tags?.map((tag) => (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      {post.data.published ? (
        <p className={clsx(`${styles.status}`, `${styles.published}`)}>
          Published
        </p>
      ) : (
        <p className={clsx(`${styles.status}`, `${styles.draft}`)}>Draft</p>
      )}
    </article>
  );
}
