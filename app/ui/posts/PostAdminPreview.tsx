import { Post } from '@/app/lib/definitions';
import styles from './PostAdminPreview.module.css';
import Link from 'next/link';

export default function AdminPostPreview(props: { post: Post }) {
  const { post } = props;

  return (
    <article className={styles.article}>
      <div className={styles.heading}>
        <Link href={`/writr/editor/post?slug=${post.data.slug}`}>
          <h3>{post.data.title}</h3>
        </Link>
      </div>
      <div className={styles.details}>
        <p>By {post.data.author}</p>
        <p>-</p>
        <p>{new Date(post.data.date).toDateString()}</p>
        {post.data.tags && (
          <div className={styles.tags}>
            <p>Tags:</p>
            {post.data.tags?.map((tag) => (
              <div key={tag} className={styles.tag}>
                {tag}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* todo: add conditional styles */}
      <p>{post.data.published ? 'Published' : 'Draft'}</p>
    </article>
  );
}
