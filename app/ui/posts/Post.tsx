import { fetchPostBySlug } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
import styles from './Post.module.css';
import Link from 'next/link';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';

// todo: add basic mobile styles to post component
export default async function Post(props: { slug: string }) {
  const post = await fetchPostBySlug(props.slug);

  //  404 if post is null
  if (!post) notFound();

  const date = new Date(post.data.date);

  return (
    <article className={styles.container}>
      <aside className={styles.frontMatter}>
        <h1 className={styles.title}>{post.data.title}</h1>
        <div className={styles.byline}>
          <div className={styles.bylineItem}>{post.data.author}</div>
          <div>—</div>
          <div className={styles.bylineItem}>{date.toDateString()}</div>
        </div>
        <div className={styles.tags}>
          {post.data.tags &&
            post.data.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <button className={styles.tag}>{tag}</button>
              </Link>
            ))}
        </div>
      </aside>
      <hr />
      <section className={styles.post}>
        <MarkdownWrapper value={post.content} />
      </section>
    </article>
  );
}
