import { fetchAllPosts, readSettings } from '@/app/lib/actions';
import styles from './page.module.css';
import PlaceholderPage from '@/app/ui/common/PlaceholderPage';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';
import PostPreview from '@/app/ui/posts/PostPreview';
import Header from '@/app/ui/common/Header';
import { ArrowRight } from 'react-feather';
import Link from 'next/link';

export default async function Home() {
  const settings = await readSettings();
  const posts = await fetchAllPosts();

  /* [ ]: Add post preview limit
   * Limit to 3 to 5 most recent posts.
   * Consider implementing this as a param in fetchAllPosts.
   */

  // [ ]: Add social links

  if (!settings.success) return <PlaceholderPage />;

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <Header>
          <h1>{settings.data.name}</h1>
        </Header>
        <MarkdownWrapper value={`${settings.data.summary}`} />
      </div>
      {posts.success && (
        <div className={styles.recent_posts}>
          <h2>Recent Posts</h2>
          <hr />
          {posts.data.map((post, index) => {
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
