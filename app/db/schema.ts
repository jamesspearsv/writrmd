import {
  boolean,
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
  published: boolean().default(false).notNull(),
  date: timestamp({ mode: 'string', withTimezone: true }),
  excerpt: varchar({ length: 256 }),
  tags: varchar({ length: 256 }),
  slug: varchar({ length: 256 }).notNull().unique(),
});
