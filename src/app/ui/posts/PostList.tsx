import { fetchPosts } from '@/src/app/lib/actions';
import { Post } from '@/src/app/lib/definitions';
import Link from 'next/link';

// todo: write post components

export default async function PostList() {
  const posts: Post[] | null = await fetchPosts();

  // todo: add error handling if unable to fetch posts
  if (!posts) return null;

  return (
    <div>
      <p>All Posts</p>
      {posts.map((post) => (
        <div key={post.data.slug}>
          <Link href={`/blog/${post.data.slug}`}>
            <p>{post.data.title}</p>
          </Link>
          <p>
            {post.data.author} {post.data.date}
          </p>
          <p>{post.data.slug}</p>
        </div>
      ))}
    </div>
  );
}
