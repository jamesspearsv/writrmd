export interface Post {
  title: string;
  body: string;
  published: boolean;
  date?: string;
  excerpt?: string;
  tags?: string;
  slug?: string;
}
