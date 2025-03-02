import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  content: z.string().min(1),
  tags: z.array(z.string()), // optional: can be an empty array
  excerpt: z.string(), // optional can be an empty string
});

export const PageSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
});

export const CredentialsSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
});
