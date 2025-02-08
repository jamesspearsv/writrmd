import Link from 'next/link';
import styles from './Heading.module.css';
import { roboto_slab } from '@/src/app/ui/fonts';
import clsx from 'clsx';

export default function Heading() {
  return (
    <Link
      href={'/'}
      className={clsx(`${roboto_slab.className} ${styles.link}`)}
    >
      <div>MDWritr</div>
    </Link>
  );
}
