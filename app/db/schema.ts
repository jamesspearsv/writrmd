import {
  integer,
  pgTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const posts = pgTable('posts', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 256 }).notNull(),
  body: text().notNull(),
  published: timestamp(),
  excerpt: varchar({ length: 256 }),
  tags: varchar({ length: 256 }),
});

// TODO: Add tags table
