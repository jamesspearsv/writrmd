'use client';

import clsx from 'clsx';
import { useScroll } from '@/app/lib/hooks';
import { ArrowUp } from 'react-feather';
import styles from './ScrollBack.module.css';

export default function ScrollBack() {
  const scroll = useScroll();
  const scrollLimit = 200;

  function scrollBack() {
    if (scroll >= scrollLimit) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <button
      className={clsx(
        `${styles.scrollBack}`,
        scroll < scrollLimit && `${styles.hidden}`
      )}
      onClick={scrollBack}
    >
      <ArrowUp size={24} />
    </button>
  );
}
