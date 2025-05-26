'use server';

import { db } from '@/app/db/connection';
import { posts } from '@/app/db/schema';
import { Post } from '@/app/lib/types';
import { eq } from 'drizzle-orm';

export async function insertPost(post: Post) {
  await db.insert(posts).values({
    title: post.title,
    body: post.body,
    published: post.published,
    date: post.date,
    excerpt: post.excerpt,
    tags: post.tags?.toString(),
    slug: post.slug,
  });
}

export async function selectPost(id: number) {
  const rows = await db.select().from(posts).where(eq(posts.id, id));
  return rows[0];
}
