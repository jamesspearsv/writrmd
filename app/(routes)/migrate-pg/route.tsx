import { insertPost } from '@/app/db/queries';
import { fetchAllPosts } from '@/app/lib/actions';
import { Post } from '@/app/lib/types';

export async function GET() {
  const result = await fetchAllPosts({ publishedOnly: false });

  if (!result.success) return Response.json('unable to read files');

  console.log(result.data);

  try {
    result.data.forEach(async (file) => {
      const post = {
        title: file.data.title,
        body: file.content,
        published: file.data.published,
        date: new Date(file.data.date).toISOString(),
        excerpt: file.data.excerpt,
        tags: file.data.tags.toString().toLowerCase(),
        slug: file.data.slug,
      } as Post;
      await insertPost(post);
    });
    return Response.json('success!');
  } catch (error) {
    console.error(error);
    return Response.json('failure');
  }
}
