import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  content: z.string().min(1),
  tags: z.string(),
  excerpt: z.string(),
});

export const PageSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});
