'use server';

import * as fs from 'node:fs/promises';
import * as matter from 'gray-matter';
import { PostSchema } from '@/app/lib/schemas';
import TaskWorker from '@/app/lib/worker';
import {
  PostFile as GreyMatterPost,
  PostEditorAction,
  Result,
} from '@/app/lib/definitions';
import { Post } from '@/app/lib/types';
import { includes } from '@/app/lib/helpers';
import { insertPost, updatePost } from '@/app/db/queries';
import { redirect } from 'next/navigation';
import { uniqueSlugify } from '@/app/lib/slugify';

// Absolute path to project dir from filesystem root
const rootDir = process.env.ROOT_PATH;
// filename regex pattern
const pattern = /^[\w-]+\.md$/;
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
}): Promise<Result<GreyMatterPost[]>> {
  const posts: GreyMatterPost[] = [];

  // Attempt to read all posts files from /content/posts
  try {
    // Get an array of all existing file names
    const files = await fs.readdir(`${rootDir}/content/posts`);

    // Read file for each existing filename
    for (const file of files) {
      if (file.match(pattern)) {
        const post = matter.read(
          `${rootDir}/content/posts/${file}`
        ) as GreyMatterPost;
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
    const TimeB = new Date(b.data.date).getTime();

    console.log('TimeA', TimeA);
    console.log('TimeB', TimeB);

    if (TimeA < TimeB) return 1;
    if (TimeA > TimeB) return -1;
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
export async function fetchPost(slug: string): Promise<Result<GreyMatterPost>> {
  const filename = slug + '.md';
  try {
    const post = matter.read(
      `${rootDir}/content/posts/${filename}`
    ) as GreyMatterPost;
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
  state: PostEditorAction,
  data: {
    post: Post;
    id?: string;
  }
) {
  // Validate incoming post data
  console.log(data.post);
  const { title, body, published, date, excerpt, tags, slug } = data.post;
  const validation = PostSchema.safeParse({
    title,
    body,
    published,
    date,
    excerpt,
    tags,
    slug,
  });

  if (!validation.success) {
    console.log(validation.error.flatten().fieldErrors);
    return {
      ok: false,
      message: 'Validation failed',
      errors: validation.error.flatten().fieldErrors,
    } as PostEditorAction;
  }

  console.log(data.post.date);
  const postDate =
    data.post.date !== null
      ? data.post.date
      : data.post.published
      ? new Date().toISOString()
      : null;

  const post = {
    title: validation.data.title,
    body: validation.data.body,
    published: data.post.published,
    date: postDate,
    excerpt: validation.data.excerpt || null,
    tags: validation.data.tags || null,
    slug: validation.data.slug || uniqueSlugify(data.post.title),
  };

  if (data.id) {
    await updatePost(data.id, post);
  } else {
    await insertPost(post);
  }

  // console.error(`Validation passed! ${new Date().toISOString()}`);

  // Uniquely slugify post name or use existing slug if provided
  // const slug = data.slug ?? uniqueSlugify(results.data.title);

  // Derive publication date from published status and existing date
  // let publicationDate;
  // if (data.date) {
  //   publicationDate = data.date;
  // } else if (results.data.published) {
  //   publicationDate = new Date().toISOString();
  // } else {
  //   publicationDate = '';
  // }

  // Redirect client if successful
  return redirect('/writr/posts');
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
