import styles from './Post.module.css';
import Link from 'next/link';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';
import { selectPosts } from '@/app/db/queries';

export default async function Post(props: { slug: string }) {
  const post = (await selectPosts({ slug: props.slug }))[0];

  // TODO: handle possible failure finding post by the given slug

  return (
    <article className={styles.container}>
      <aside className={styles.frontMatter}>
        <h1 className={styles.title}>{post.title}</h1>
        <div className={styles.byline}>
          <div className={styles.bylineItem}>
            {new Date(post.date!).toDateString()}
          </div>
        </div>
        <div className={styles.tags}>
          {post.tags &&
            post.tags.split(',').map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <button className={styles.tag}>{tag}</button>
              </Link>
            ))}
        </div>
      </aside>
      <hr />
      <section className={styles.post}>
        <MarkdownWrapper value={post.body} />
      </section>
    </article>
  );
}
