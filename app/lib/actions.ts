'use server';

import * as fs from 'node:fs/promises';
import * as matter from 'gray-matter';
import { FormState, Page, Post } from '@/app/lib/definitions';
import { PostSchema } from '@/app/lib/schemas';
import slugify from 'slugify';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Absolute path to project dir from filesystem root
const rootDir = process.env.ROOT_PATH;
const pattern = /^[\w-]+\.md$/;

/**
 * Asynchronously fetches all available posts
 * @param {string} tag - Tag includes in query params for /blog route
 * @returns {Post[] | null} - Returns an array of posts or null unsuccessful
 */
export async function fetchPosts(tag?: string) {
  const posts: Post[] = [];

  try {
    const files = await fs.readdir(`${rootDir}/content/posts`);

    for (const file of files) {
      if (file.match(pattern)) {
        const post = matter.read(`${rootDir}/content/posts/${file}`) as Post;
        post.data.slug = file.split('.')[0];
        posts.push(post);
      }
    }
  } catch (error) {
    console.error(error);
    return null;
  }
  posts.sort(
    (a, b) => new Date(a.data.date).getTime() - new Date(b.data.date).getTime()
  );

  // filter by tag if given
  if (tag) {
    const filteredPosts = posts.filter((post) => {
      let match = false;
      const tags = post.data.tags;
      if (tags) {
        tags.forEach((t) => {
          if (t.toLocaleLowerCase() === tag.toLocaleLowerCase()) match = true;
        });
      }
      return match;
    });
    return filteredPosts;
  }

  return posts;
}

/**
 * Asynchronously fetches a single post from a given slug
 * @param {string} slug - Post slug derived from a route url
 * @returns {Post | null} - Returns a single post or null if unsuccessful
 */
export async function fetchPostBySlug(slug: string) {
  const filename = slug + '.md';
  try {
    const file = matter.read(`${rootDir}/content/posts/${filename}`) as Post;
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
  const pages: Page[] = [];
  let files: string[];

  try {
    files = await fs.readdir(`${rootDir}/content/pages`);
  } catch (error) {
    console.error(error);
    return null;
  }

  files.forEach((file) => {
    // skip index page
    if (file !== 'index.md' && file.match(pattern)) {
      const page = matter.read(`${rootDir}/content/pages/${file}`) as Page;
      page.data.slug = file.split('.')[0];
      pages.push(page);
    }
  });

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
    const file = matter.read(`${rootDir}/content/pages/${filename}`) as Page;
    return file;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function addNewPost(currentState: FormState, data: FormData) {
  // validate form data
  const results = PostSchema.safeParse({
    title: data.get('title'),
    author: data.get('author'),
    content: data.get('content'),
    tags: data.get('tags'),
    excerpt: data.get('excerpt'),
  });

  if (!results.success) {
    console.error('Validation failed!');
    // todo: return more detailed errors for individual fields
    return {
      error: 'Error adding new posts',
      prevValues: {
        title: data.get('title'),
        author: data.get('author'),
        content: data.get('content'),
        tags: data.get('tags'),
        excerpt: data.get('excerpt'),
      },
    } as FormState;
  }

  console.error('Validation passed!');
  const slug = slugify(data.get('title') as string);
  const t = data.get('tags') as string;
  const tags = t.split(',');

  const fileContents =
    '---\n' +
    `title: '${data.get('title')}'\n` +
    `author: '${data.get('author')}'\n` +
    `date: ${new Date().toISOString()}\n` +
    `tags: [${tags.map((tag) => `'${tag}'`)}]\n` +
    `excerpt: '${data.get('excerpt')}'\n` +
    '---\n\n' +
    `${data.get('content')}\n`;

  try {
    await fs.writeFile(
      `${rootDir}/content/posts/${slug.toLowerCase()}.md`,
      fileContents
    );
  } catch (error) {
    console.error(error);
    return {
      error: 'Server Error',
      prevValues: {
        title: data.get('title'),
        author: data.get('author'),
        content: data.get('content'),
        tags: data.get('tags'),
        excerpt: data.get('excerpt'),
      },
    } as FormState;
  }

  redirect('/writr/posts');
}
