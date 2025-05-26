'use server';

import { db } from '@/app/db/connection';
import { posts } from '@/app/db/schema';
import { Post } from '@/app/lib/types';

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
