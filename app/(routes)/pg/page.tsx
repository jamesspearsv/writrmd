import { selectPost } from '@/app/db/queries';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';

export default async function Page() {
  const row = await selectPost(2);

  return (
    <main style={{ margin: '3rem' }}>
      <h1>{row.title}</h1>
      <MarkdownWrapper value={row.body} />
    </main>
  );
}
