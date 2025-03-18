import { fetchPostBySlug } from '@/app/lib/actions';
import { notFound } from 'next/navigation';
import styles from './Post.module.css';
import Link from 'next/link';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';

export default async function Post(props: { slug: string }) {
  const file = await fetchPostBySlug(props.slug);

  //  404 if file is null
  if (!file) notFound();

  const date = new Date(file.data.date);

  return (
    <article className={styles.container}>
      <aside className={styles.frontMatter}>
        <div>{file.data.author}</div>
        <div className={styles.date}>{date.toLocaleDateString()}</div>
        <div className={styles.tags}>
          {file.data.tags &&
            file.data.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <button className={styles.tag}>{tag}</button>
              </Link>
            ))}
        </div>
      </aside>
      <section>
        <MarkdownWrapper value={file.content} />
      </section>
    </article>
  );
}
