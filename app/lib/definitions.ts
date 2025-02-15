import * as matter from 'gray-matter';

export interface Post extends matter.GrayMatterFile<string> {
  data: {
    title: string;
    date: string;
    author: string;
    tags?: string[];
    excerpt?: string;
    slug: string; // custom slug property to id and link posts
  };
  empty: string; // Optional, because it might be an empty string or undefined
  isEmpty: boolean; // Boolean indicating if the front-matter is empty
}

export interface Page extends matter.GrayMatterFile<string> {
  data: {
    title: string;
    slug: string;
  };
  empty: string;
  isEmpty: boolean;
}
