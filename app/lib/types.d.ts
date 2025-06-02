export interface Post {
  title: string;
  body: string;
  published: boolean;
  date: string | null;
  excerpt: string | null;
  tags: string | null;
  slug: string;
}
