'use server';

import * as fs from 'node:fs/promises';
import * as matter from 'gray-matter';
import { Post } from '@/app/lib/definitions';

export async function fetchPosts() {
  const rootDir = process.env.ROOT_PATH || process.cwd();
  const posts: Post[] = [];

  try {
    const files = await fs.readdir(`${rootDir}/posts`);

    for (const file of files) {
      const post = matter.read(`${rootDir}/posts/${file}`) as Post;
      post.data.slug = file.split('.')[0];
      posts.push(post);
    }

    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}
