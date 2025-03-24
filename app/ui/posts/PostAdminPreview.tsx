import { Post } from '@/app/lib/definitions';
import styles from './PostAdminPreview.module.css';

export default function AdminPostPreview(props: { post: Post }) {
  const { post } = props;

  return (
    <article className={styles.article}>
      <div className={styles.heading}>
        <h3>{post.data.title}</h3>
      </div>
      <div className={styles.details}>
        <p>By {post.data.author}</p>
        <p>-</p>
        <p>{new Date(post.data.date).toDateString()}</p>
        {post.data.tags && (
          <div className={styles.tags}>
            <p>Tags:</p>
            {post.data.tags?.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
