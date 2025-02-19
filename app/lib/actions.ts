'use server';

import * as fs from 'node:fs/promises';
import * as matter from 'gray-matter';
import {
  Page,
  PageEditorData,
  PageEditorState,
  Post,
  PostEditorData,
  PostEditorActionState,
} from '@/app/lib/definitions';
import { PageSchema, PostSchema } from '@/app/lib/schemas';
import slugify from 'slugify';
import { redirect } from 'next/navigation';

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

// todo: write addNewPost documentation
// todo: fix after typing changes in tags
export async function writeNewPost(
  state: PostEditorActionState,
  data: PostEditorData
) {
  // 1. validate submitted data
  // 2. if validation fails return errors and data
  // 3. else if validation succeeds attempt to write data to filesystem
  // 4. if write successful redirect to /writr/posts

  const results = PostSchema.safeParse({
    title: data.title,
    author: data.author,
    excerpt: data.excerpt,
    tags: data.tags,
    content: data.content,
  } as PostEditorData);

  if (!results.success) {
    console.error(`Validation failed! ${new Date().toISOString()}`);
    console.error(results.error.flatten().fieldErrors);
    return {
      ok: false,
      message: 'Validation failed',
      errors: results.error.flatten().fieldErrors,
      values: data,
    } as PostEditorActionState;
  }

  console.error(`Validation passed! ${new Date().toISOString()}`);

  // todo: sanitize filenames
  // todo: uniqueify filenames
  const slug = slugify(data.title, {
    lower: true,
    remove: /[<>:"/\\|?*\.,;!@#%^&(){}\[\]~`'$=+]/g,
  });

  const fileContents =
    '---\n' +
    `title: '${data.title}'\n` +
    `author: '${data.author}'\n` +
    `date: ${new Date().toISOString()}\n` +
    `tags: [${data.tags.map((tag) => `'${tag}'`)}]\n` +
    `excerpt: '${data.excerpt}'\n` +
    '---\n\n' +
    `${data.content}\n`;

  try {
    await fs.writeFile(
      `${rootDir}/content/posts/${slug.toLowerCase()}.md`,
      fileContents
    );
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: 'Server error! Please try again later.',
      errors: {},
      values: data,
    } as PostEditorActionState;
  }

  return {
    ok: true,
    message: null,
    errors: {},
    values: {
      title: '',
      author: '',
      excerpt: '',
      tags: [],
      content: '',
    },
  } as PostEditorActionState;

  // redirect('/writr/posts');
}

// todo: write addNewPage documentation
// todo: refactor addNewPage action
export async function addNewPage(
  prevState: PageEditorState,
  values: PageEditorData
) {
  // Validate submitted data
  const results = PageSchema.safeParse({
    title: values.title,
    content: values.content,
  });

  if (!results.success) {
    console.log('validation failed');
    return {
      error: 'Validation failed!',
      values,
    } as PageEditorState;
  }

  const filename = `${slugify(values.title).toLowerCase()}.md`;
  const fileContents =
    '---\n' + `title: ${values.title}\n` + '---\n\n' + `${values.content}`;

  console.log('filename', filename);
  console.log('fileContents');
  console.log(fileContents);

  try {
    await fs.writeFile(`${rootDir}/content/pages/${filename}`, fileContents);
  } catch (error) {
    console.error(error);
    return {
      error: 'Error writing file',
      values,
    } as PageEditorState;
  }

  // todo: update redirect
  redirect('/writr/pages');
}
