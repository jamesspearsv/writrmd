/** CLIENT SIDE VALIDATION SCHEMAS **/
import { z } from 'zod';

export const PostSchema = z.object({
  title: z.string().min(1),
  body: z.string().min(1),
  published: z.boolean(),
  date: z.string() || z.null(),
  excerpt: z.string(), // optional can be an empty string
  tags: z.string(), // optional: can be an empty string
  slug: z.string(), // can be an empty string
});

export const CredentialsSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(5),
});

export const BlogSettingsSchema = z.object({
  name: z.string().min(5),
  summary: z.string().min(10),
});
