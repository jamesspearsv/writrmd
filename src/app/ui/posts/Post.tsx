import { fetchPostBySlug } from '@/src/app/lib/actions';
import Markdown from 'marked-react';
import { notFound } from 'next/navigation';
import styles from './Post.module.css';
import { Button } from '@ariakit/react';

export default async function Post(props: { slug: string }) {
  const file = await fetchPostBySlug(props.slug);

  //  404 if file is null
  if (!file) notFound();

  const date = new Date(file.data.date);

  return (
    // todo: add breadcrumbs
    <div className={styles.container}>
      {/* todo: add post front matter */}
      <div className={styles.frontMatter}>
        <div>{file.data.author}</div>
        <div className={styles.date}>{date.toDateString()}</div>
        <div className={styles.tags}>
          {file.data.tags &&
            file.data.tags.map((tag) => (
              <Button key={tag} className={styles.tag}>
                {tag}
              </Button>
            ))}
        </div>
      </div>
      <article className={styles.article}>
        <Markdown value={file.content} />
      </article>
    </div>
  );
}
