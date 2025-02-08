'use server';

import * as fs from 'node:fs/promises';
import * as matter from 'gray-matter';
import { Page, Post } from '@/src/app/lib/definitions';

const rootDir = process.env.ROOT_PATH || process.cwd();

/**
 * Asynchronously fetches all available posts from /src/posts
 * @returns {Post[] | null} - Returns an array of posts or null unsuccessful
 */
export async function fetchPosts() {
  const posts: Post[] = [];

  try {
    const files = await fs.readdir(`${rootDir}/src/posts`);

    for (const file of files) {
      const post = matter.read(`${rootDir}/src/posts/${file}`) as Post;
      post.data.slug = file.split('.')[0];
      posts.push(post);
    }

    return posts;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Asynchronously fetches a single post from a given slug
 * @param {string} slug - Post slug derived from a route url
 * @returns {Post | null} - Returns a single post or null if unsuccessful
 */
export async function fetchPostBySlug(slug: string) {
  const filename = slug + '.md';
  try {
    const file = matter.read(`${rootDir}/src/posts/${filename}`) as Post;
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * Asynchronously build an index of stand alone pages
 * @returns {string[]} - An array of strings representing page urls
 */
export async function buildPagesIndex() {
  const pages: string[] = [];
  let files: string[];

  try {
    files = await fs.readdir(`${rootDir}/src/pages`);
  } catch (error) {
    console.error(error);
    return null;
  }

  files.forEach((file) => {
    // skip index page
    if (file !== 'index.md') {
      const page = file.split('.')[0];
      pages.push(page);
    }
  });

  console.log(pages);
  return pages;
}

/**
 *
 * @param {string} page - Requested page url as a string
 * @returns {Page | null} - Returns a single page or null if errors
 */
export async function fetchPage(page: string) {
  try {
    const filename = `${page}.md`;
    const file = matter.read(`${rootDir}/src/pages/${filename}`) as Page;
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
}
