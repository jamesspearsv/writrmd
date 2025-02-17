import styles from './page.module.css';
import AddPageForm from '@/app/ui/forms/AddPageForm';

export default function Page() {
  return (
    <main>
      <h1>Add a new page</h1>
      <AddPageForm />
    </main>
  );
}
