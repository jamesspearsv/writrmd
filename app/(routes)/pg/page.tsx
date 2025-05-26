import { selectPosts } from '@/app/db/queries';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';

export default async function Page() {
  const rows = await selectPosts();
  const row = (await selectPosts(2))[0];

  return (
    <main style={{ margin: '3rem' }}>
      <div>
        {rows.map((row) => (
          <div key={row.id} style={{ display: 'flex', gap: '1rem' }}>
            <span>{row.id}</span>
            <span>{row.title}</span>
          </div>
        ))}
      </div>
      <hr />
      <h1>{row.title}</h1>
      <MarkdownWrapper value={row.body} />
    </main>
  );
}
