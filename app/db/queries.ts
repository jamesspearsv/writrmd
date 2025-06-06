'use server';

import { db } from '@/app/db/connection';
import { posts } from '@/app/db/schema';
import { and, eq, or } from 'drizzle-orm';
import { Post } from '@/app/lib/types';
import { Result } from '@/app/lib/definitions';

export async function insertPost(post: Post) {
  await db.insert(posts).values({
    title: post.title,
    body: post.body,
    published: post.published,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags,
    slug: post.slug,
  });
}

export async function selectPosts(filters: {
  id?: string;
  slug?: string;
  published?: boolean;
}) {
  const rows = await db
    .select()
    .from(posts)
    .where(
      and(
        or(
          filters.id ? eq(posts.id, filters.id) : undefined,
          filters.slug ? eq(posts.slug, filters.slug) : undefined
        ),
        filters.published ? eq(posts.published, filters.published) : undefined
      )
    );
  return rows;
}

export async function updatePost(id: string, data: Post): Promise<Result> {
  try {
    await db
      .update(posts)
      .set({
        title: data.title,
        body: data.body,
        published: data.published,
        excerpt: data.excerpt,
        tags: posts.tags,
        date: data.date,
        slug: data.slug,
      })
      .where(eq(posts.id, id));
    return { success: true, data: 'Post updated' };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Unable to update post' };
  }
}
