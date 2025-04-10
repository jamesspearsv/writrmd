import * as matter from 'gray-matter';
import { User } from 'next-auth';

export interface Post extends matter.GrayMatterFile<string> {
  data: {
    title: string;
    date: string;
    author: string;
    tags?: string[];
    excerpt?: string;
    slug: string; // custom slug property to id and link posts
    published: boolean;
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

export interface CommonInputProps<V> {
  name: string;
  error: boolean;
  placeholder?: string;
  controller: {
    key: string;
    value: V;
    updateValue: (key: string, value: V) => void;
  };
}

export type PostContent = {
  title: string;
  author: string;
  excerpt: string;
  tags: string[];
  content: string;
  published: boolean;
};

export type PostEditorAction = {
  ok: boolean;
  message: string | null;
  errors: Partial<Record<keyof PostContent, string>>;
};

export interface Admin extends User {
  username: string;
}

export interface BlogSettings {
  name: string;
  summary: string;
  icon?: string;
}

export type Result<T = string> =
  | { success: true; data: T }
  | { success: false; error: string };
