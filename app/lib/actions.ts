'use server';

import * as fs from 'node:fs/promises';
import * as matter from 'gray-matter';
import { Post } from '@/app/lib/definitions';

const rootDir = process.env.ROOT_PATH || process.cwd();

// todo: add doc
export async function fetchPosts() {
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

// todo: add doc
export async function fetchPostBySlug(slug: string) {
  const filename = slug + '.md';
  try {
    const file = matter.read(`${rootDir}/posts/${filename}`) as Post;
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
}
