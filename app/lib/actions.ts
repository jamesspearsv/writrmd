'use server';

import * as fs from 'node:fs/promises';
import * as matter from 'gray-matter';
import { BlogSettingsSchema, PostSchema } from '@/app/lib/schemas';
import { uniqueSlugify } from '@/app/lib/slugify';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import TaskWorker from '@/app/lib/worker';
import {
  Post,
  PostContent,
  PostEditorAction,
  BlogSettings,
  Result,
} from '@/app/lib/definitions';
import { includes } from '@/app/lib/helpers';

// Absolute path to project dir from filesystem root
const rootDir = process.env.ROOT_PATH;
// filename regex pattern
const pattern = /^[\w-]+\.md$/;
const settingsFile =
  process.env.NODE_ENV === 'production' ? 'settings.json' : 'settings.dev.json';
const worker = new TaskWorker();

/**
 * Asynchronously fetches all existing posts
 * @param options Options object used to provide filtering choices including tags, publication status, and number of posts to fetch
 * @returns Returns a promise that resolves to a successful result object with an array of posts or rejects with an unsuccessful Result object
 */
export async function fetchAllPosts(options?: {
  tag?: string;
  limit?: number;
  publishedOnly: boolean;
}): Promise<Result<Post[]>> {
  const posts: Post[] = [];

  // Attempt to read all posts files from /content/posts
  try {
    // Get an array of all existing file names
    const files = await fs.readdir(`${rootDir}/content/posts`);

    // Read file for each existing filename
    for (const file of files) {
      if (file.match(pattern)) {
        const post = matter.read(`${rootDir}/content/posts/${file}`) as Post;
        post.data.slug = file.split('.')[0];
        posts.push(post);
      }
    }
  } catch (error) {
    // Return null if reading files is unsuccessful
    console.error(error);
    return { success: false, error: 'Unable to fetch posts' };
  }

  // Sort all posts by publication data
  posts.sort((a, b) => {
    if (!a.data.date && !b.data.date) return 0;
    if (!a.data.date) return -1;
    if (!b.data.date) return 1;

    const TimeA = new Date(a.data.date).getTime();
    const TimeB = new Date(a.data.date).getTime();

    if (TimeA < TimeB) return -1;
    if (TimeA > TimeB) return 1;
    return 0;
  });

  if (options) {
    const filterResults = posts;

    // Filter posts by publishedOnly option
    if (options.publishedOnly) {
      filterResults.forEach((post, index) => {
        if (!post.data.published) filterResults.splice(index, 1);
      });
    }

    // Filter by a tag option
    if (options.tag) {
      filterResults.forEach((post, index) => {
        if (options.tag && !includes(post.data.tags, options.tag))
          filterResults.splice(index, 1);
      });
    }

    // Filter posts by limit option
    if (options.limit && options.limit > 0) {
      while (filterResults.length > options.limit) {
        filterResults.pop();
      }
    }

    // Return matching posts to the client
    return { success: true, data: filterResults };
  } else {
    // Return all posts to the client
    return { success: true, data: posts };
  }
}

/**
 * Asynchronously fetches a single post from a given slug
 * @param slug Post slug derived from a route url
 * @returns Returns a promise that resolves to a successful Result object with a single post or rejects with an unsuccessful Result object
 */
export async function fetchPost(slug: string): Promise<Result<Post>> {
  const filename = slug + '.md';
  try {
    const post = matter.read(`${rootDir}/content/posts/${filename}`) as Post;
    return { success: true, data: post };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Unable to fetch post' };
  }
}

/**
 * Asynchronously write a new post file to server filesystem
 * @param _ The current editor state object including ok status, error message, field errors
 * @param data An object containing post content, slug, and existing publication date when editing an existing post
 * @returns Returns a new editor state or redirects if a new file was saved successfully
 */
export async function savePost(
  _: PostEditorAction,
  data: {
    post: PostContent;
    slug: string | undefined;
    date: string | undefined;
  }
) {
  // Validate submitted content against the PostSchema
  const results = PostSchema.safeParse({
    title: data.post.title,
    author: data.post.author,
    excerpt: data.post.excerpt,
    tags: data.post.tags,
    content: data.post.content,
    published: data.post.published,
  } as PostContent);

  // Handle unsuccessful validation
  if (!results.success) {
    console.error(`Validation failed! ${new Date().toISOString()}`);
    console.error(results.error.flatten().fieldErrors);
    // Return an unsuccessful action state
    return {
      ok: false,
      message: 'Validation failed',
      errors: results.error.flatten().fieldErrors,
    } as PostEditorAction;
  }

  console.error(`Validation passed! ${new Date().toISOString()}`);

  // Uniquely slugify post name or use existing slug if provided
  const slug = data.slug ?? uniqueSlugify(results.data.title);

  // Derive publication date from published status and existing date
  let publicationDate;
  if (data.date) {
    publicationDate = data.date;
  } else if (results.data.published) {
    publicationDate = new Date().toISOString();
  } else {
    publicationDate = '';
  }

  // Format post content to write
  const fileContents =
    `---\n` +
    `title: "${results.data.title}"\n` +
    `author: "${results.data.author}"\n` +
    `date: "${publicationDate}"\n` +
    `tags: [${results.data.tags.map((tag) => `"${tag}"`)}]\n` +
    `excerpt: "${results.data.excerpt}"\n` +
    `published: ${results.data.published}\n` +
    `---\n` +
    `${results.data.content}` +
    `\n`;

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

  // Redirect client if successful
  redirect('/writr/posts');
}

/**
 * Asynchronously read app settings using an internal worker queue
 * @returns Returns a promise resolves to a successful result object with the current settings or rejects with an unsuccessful result object
 */
// todo: add fallback values for new settings properties
export async function readSettings(): Promise<Result<BlogSettings>> {
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

export async function UpdateSettings(
  _: Result<BlogSettings>,
  formData: FormData
) {
  // Validate new settings values
  const results = BlogSettingsSchema.safeParse({
    name: formData.get('name'),
    summary: formData.get('summary'),
  } as BlogSettings);

  // Return an unsuccessful result if validation fails
  if (!results.success) {
    return {
      success: false,
      error: 'Invalid settings values',
    } as Result<BlogSettings>;
  }

  // Store new settings and attempt to update settings file
  const updatedSettings: BlogSettings = {
    name: results.data.name,
    summary: results.data.summary,
  };

  try {
    await fs.writeFile(
      `${rootDir}/content/${settingsFile}`,
      JSON.stringify(updatedSettings)
    );
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: 'Unable to save new settings',
    } as Result<BlogSettings>;
  }

  revalidatePath('/writr/settings');
  return { success: true, data: updatedSettings } as Result<BlogSettings>;
}

/**
 * Asynchronously update a given settings property with a given value
 * @param key A valid property defined in the app settings
 * @param value A valid value that the provided setting should be updated to.
 */
export async function updateSettingValue<K extends keyof BlogSettings>(
  key: K,
  value: BlogSettings[K]
) {
  // Define the process to update the provided settings property
  const process = async () => {
    const settings = await readSettings();

    // Update the given property if successful
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
        } as Result;
      } catch (error) {
        if (error instanceof Error) {
          console.error(error);
          return {
            success: false,
            error: 'Unable to update settings',
          } as Result;
        }
      }
    }

    // Handle an unsuccessful attempt to read the app settings
    return {
      success: false,
      error: 'Unable to read settings',
    } as Result;
  };

  // Add the update process to worker queue and await the result
  await worker.add<Result<string>>(process);
  revalidatePath('/writr/settings');
}

/**
 * Internal TaskWorker testing function
 */
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
