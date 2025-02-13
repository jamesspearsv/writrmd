import { fetchPostBySlug } from '@/src/app/lib/actions';
import Markdown from 'marked-react';
import { notFound } from 'next/navigation';
import styles from './Post.module.css';
import { Button } from '@ariakit/react';
import Link from 'next/link';

export default async function Post(props: { slug: string }) {
  const file = await fetchPostBySlug(props.slug);

  //  404 if file is null
  if (!file) notFound();

  const date = new Date(file.data.date);

  return (
    <article className={styles.container}>
      <aside className={styles.frontMatter}>
        <div>{file.data.author}</div>
        <div className={styles.date}>{date.toDateString()}</div>
        <div className={styles.tags}>
          {file.data.tags &&
            file.data.tags.map((tag) => (
              <Link key={tag} href={`/blog?tag=${tag}`}>
                <Button className={styles.tag}>{tag}</Button>
              </Link>
            ))}
        </div>
      </aside>
      <section className={styles.post}>
        <Markdown value={file.content} />
      </section>
    </article>
  );
}
