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

// Generic function type for updating the value of a controlled input based on a given type
export type ValueUpdater<T> = (name: keyof T, value: T[keyof T]) => void;

export interface GenericInputProps {
  name: string;
  label: string;
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
  values: PostEditorData;
};
