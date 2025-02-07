import { fetchPostBySlug } from '@/app/lib/actions';
import Markdown from 'marked-react';
import { notFound } from 'next/navigation';
import styles from './Post.module.css';

export default async function Post(props: { slug: string }) {
  const file = await fetchPostBySlug(props.slug);

  //  404 if file is null
  if (!file) notFound();

  return (
    // todo: add breadcrumbs
    <article className={styles.article}>
      <Markdown value={file.content} />
      {/* todo: add post front matter */}
    </article>
  );
}
