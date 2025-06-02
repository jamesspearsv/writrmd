import { Post } from '@/app/lib/types';
import { selectPosts } from '@/app/db/queries';
import PostEditor from '@/app/ui/editors/PostEditor';

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await props.params).slug;
  const post = (await selectPosts({ slug }))[0];

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
