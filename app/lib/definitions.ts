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

// Generic function to update a controlled input value based on a given type
export type ValueUpdater<T> = (name: keyof T, value: T[keyof T]) => void;

export interface GenericInputProps {
  name: string;
  label?: string;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updateValue: ValueUpdater<any>;
}

export type PostEditorData = {
  title: string;
  author: string;
  excerpt: string;
  tags: string[];
  content: string;
};

export type PostEditorActionState = {
  ok: boolean;
  message: string | null;
  errors: Partial<Record<keyof PostEditorData, string>>;
};

// fixme: remove unneeded definition
export type SetUpActionState = { error: string };

export interface Admin extends User {
  username: string;
}

export interface BlogSettings {
  // todo: add social links to settings
  blogName: string;
  blogSummary: string;
  icon?: string; // todo: url string to an svg icon
}

export type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };
