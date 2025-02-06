import { fetchPosts } from '@/app/lib/actions';
import { Post } from '@/app/lib/definitions';

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
          <p>{post.data.title}</p>
          <p>
            {post.data.author} {post.data.date}
          </p>
          <p>{post.path}</p>
        </div>
      ))}
    </div>
  );
}
