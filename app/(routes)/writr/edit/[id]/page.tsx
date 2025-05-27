import { Post } from '@/app/lib/types';
import { selectPosts } from '@/app/db/queries';
import PostEditor from '@/app/ui/editors/PostEditor';

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const id = (await props.params).id;
  const post = (await selectPosts(parseInt(id)))[0];

  return (
    <>
      <PostEditor
        post={
          post
            ? ({
                title: post.title,
                body: post.body,
                published: post.published,
                date: post.date,
                excerpt: post.excerpt,
                tags: post.tags,
                slug: post.slug,
              } as Post)
            : undefined
        }
        id={post.id}
      />
    </>
  );
}
