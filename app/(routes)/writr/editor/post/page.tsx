import { fetchPost } from '@/app/lib/actions';
import { PostContent } from '@/app/lib/definitions';
import PostEditor from '@/app/ui/editors/PostEditor';

export default async function Page(props: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const slug = (await props.searchParams).slug;
  const result = slug ? await fetchPost(slug) : undefined;
  const post = result && result.success ? result.data : undefined;

  return (
    <>
      <PostEditor
        post={
          post
            ? ({
                title: post.data.title,
                author: post.data.author,
                excerpt: post.data.excerpt,
                tags: post.data.tags,
                content: post.content,
                published: post.data.published,
              } as PostContent)
            : undefined
        }
        slug={slug}
        date={post?.data.date}
      />
    </>
  );
}
