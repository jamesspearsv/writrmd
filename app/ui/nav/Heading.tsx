import Link from 'next/link';
import styles from './Heading.module.css'

export default function Heading() {
  return (
    <Link href={'/'} className={styles.link}>
      <div>MDWritr</div>
    </Link>
  );
}
