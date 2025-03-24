import { Post } from '@/app/lib/definitions';
import styles from './PostAdminPreview.module.css';

export default function AdminPostPreview(props: { post: Post }) {
  const { post } = props;

  return (
    <article>
      <p>{post.data.title}</p>
      <p>{post.data.author}</p>
      <p>{new Date(post.data.date).toDateString()}</p>
      <div>
        {post.data.tags?.map((tag) => (
          <p key={tag}>{tag}</p>
        ))}
      </div>
      <p>{post.data.excerpt}</p>
    </article>
  );
}
