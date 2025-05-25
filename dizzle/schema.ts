import { integer, pgTable, varchar } from 'drizzle-orm/pg-core';

const posts = pgTable({
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
});
