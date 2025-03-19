'use server';

import * as fs from 'node:fs/promises';
import * as matter from 'gray-matter';
import {
  Post,
  Page,
  PostContent,
  PostEditorAction,
  BlogSettings,
  ActionResult,
} from '@/app/lib/definitions';
import { PostSchema } from '@/app/lib/schemas';
import { uniqueSlugify } from '@/app/lib/slugify';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import TaskWorker from '@/app/lib/worker';

// Absolute path to project dir from filesystem root
const rootDir = process.env.ROOT_PATH;
// filename regex pattern
const pattern = /^[\w-]+\.md$/;
const settingsFile =
  process.env.NODE_ENV === 'production' ? 'settings.json' : 'settings.dev.json';

/**
 * Asynchronously fetches all available posts
 * @param {string} tag - Tag included in query params for /blog route
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
 * @returns {string[]} - An array page urls as strings
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
 * Asynchronously fetch a standalone page from a given url slug
 * @param {string} page - Requested page url slug as a string
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

/**
 * Asynchronously write a new post file to server filesystem
 * @param {PostEditorAction} state - Current editor state including ok status, field errors, messages, and previous values
 * @param {PostContent} data - Submitted editor data
 * @returns Returns a new editor state or redirects if successfully writes new file
 */
export async function writeNewPost(state: PostEditorAction, data: PostContent) {
  const results = PostSchema.safeParse({
    title: data.title,
    author: data.author,
    excerpt: data.excerpt,
    tags: data.tags,
    content: data.content,
  } as PostContent);

  if (!results.success) {
    console.error(`Validation failed! ${new Date().toISOString()}`);
    console.error(results.error.flatten().fieldErrors);
    return {
      ok: false,
      message: 'Validation failed',
      errors: results.error.flatten().fieldErrors,
    } as PostEditorAction;
  }

  console.error(`Validation passed! ${new Date().toISOString()}`);

  // Uniquely slugify post name
  const slug = uniqueSlugify(data.title);
  const fileContents =
    '---\n' +
    `title: '${data.title}'\n` +
    `author: '${data.author}'\n` +
    `date: ${new Date().toISOString()}\n` +
    `tags: [${data.tags.map((tag) => `'${tag}'`)}]\n` +
    `excerpt: '${data.excerpt}'\n` +
    '---\n\n' +
    `${data.content}\n`;

  // Attempt to write new file to filesystem. Catch if unsuccessful
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
    } as PostEditorAction;
  }

  // redirect if successful
  redirect('/writr/posts');
}

export async function readSettings(): Promise<ActionResult<BlogSettings>> {
  try {
    const data = await fs.readFile(`${rootDir}/content/${settingsFile}`, {
      encoding: 'utf-8',
    });
    const settings = JSON.parse(data) as BlogSettings;

    return { success: true, data: settings };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Server error' };
  }
}

const worker = new TaskWorker();

export async function updateSettingValue<K extends keyof BlogSettings>(
  key: K,
  value: BlogSettings[K]
) {
  // define process to update settings
  const process = async () => {
    const settings = await readSettings();

    // todo: handle errors when reading settings.json
    if (settings.success) {
      const newSettings = { ...settings.data };
      newSettings[key] = value;

      try {
        await fs.writeFile(
          `${rootDir}/content/${settingsFile}`,
          JSON.stringify(newSettings)
        );
        return {
          success: true,
          data: 'Successfully updated settings',
        } as ActionResult<string>;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          return {
            success: false,
            error: 'Unable to update settings',
          } as ActionResult<string>;
        }
      }
    }

    return {
      success: false,
      error: 'Unable to read settings',
    } as ActionResult<string>;
  };

  // add process to worker queue and await result
  await worker.add<ActionResult<string>>(process);
  revalidatePath('/writr/settings');
}

export async function WorkerTest() {
  console.log('<! -- Starting worker test -->');

  const filename = `${rootDir}/content/worker.txt`;

  const task1 = () => {
    return new Promise(async (resolve) => {
      const content = await fs.readFile(filename, 'utf-8');
      setTimeout(async () => {
        const newContent = content + '\nAdding content from a long running job';
        await fs.writeFile(filename, newContent);
        resolve({ success: true, data: 'Completed long job' });
      }, 5000);
    });
  };

  const task2 = () => {
    return new Promise(async (resolve) => {
      const content = await fs.readFile(filename, 'utf-8');
      setTimeout(async () => {
        const newContent = content + '\nAdding content from a fast running job';
        await fs.writeFile(filename, newContent);
        resolve({ success: true, data: 'Completed fast job' });
      }, 2000);
    });
  };

  worker.add(task1).then((value) => console.log(value));
  worker.add(task2).then((value) => console.log(value));
}
