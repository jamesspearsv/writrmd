import styles from './page.module.css';
import PageEditor from '@/app/ui/editors/PageEditor';

export default function Page() {
  return (
    <main>
      <h1>Add a new page</h1>
      <PageEditor />
    </main>
  );
}
