import styles from './page.module.css';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';
import PostPreview from '@/app/ui/posts/PostPreview';
import Header from '@/app/ui/common/Header';
import { ArrowRight } from 'react-feather';
import Link from 'next/link';
import { selectPosts } from '@/app/db/queries';
import SITE_SETTINGS from '@/app/lib/settings';

export default async function Home() {
  // const posts = await fetchAllPosts({ publishedOnly: true, limit: 5 });
  const posts = await selectPosts({ published: true });

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Header>
          <h1>{SITE_SETTINGS.SITE_NAME}</h1>
        </Header>
        <MarkdownWrapper value={`${SITE_SETTINGS.SITE_DESCRIPTION}`} />
      </div>
      {posts && (
        <div className={styles.recent_posts}>
          <h2>Recent Posts</h2>
          <hr />
          {posts.map((post, index) => {
            return <PostPreview key={index} post={post} variant="minimal" />;
          })}
          <Link href={'/blog'} className={styles.all_posts}>
            <div>
              <div>All Posts</div>
              <ArrowRight size={18} />
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
