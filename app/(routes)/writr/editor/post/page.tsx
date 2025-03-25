import { fetchPostBySlug } from '@/app/lib/actions';
import { PostContent } from '@/app/lib/definitions';
import PostEditor from '@/app/ui/editors/PostEditor';

export default async function Page(props: {
  searchParams: Promise<{ slug?: string }>;
}) {
  const slug = (await props.searchParams).slug;
  const post = slug ? await fetchPostBySlug(slug) : undefined;

  return (
    <main>
      <PostEditor
        post={
          post
            ? ({
                title: post.data.title,
                author: post.data.author,
                excerpt: post.data.excerpt,
                tags: post.data.tags,
                content: post.content,
                published: false,
              } as PostContent)
            : undefined
        }
      />
    </main>
  );
}
