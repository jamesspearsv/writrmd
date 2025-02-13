'use client';

import clsx from 'clsx';
import { useScroll } from '@/src/app/lib/hooks';
import { ArrowUp } from 'react-feather';
import { Button } from '@ariakit/react';
import styles from './ScrollBack.module.css';

export default function ScrollBack() {
  const scroll = useScroll();
  const scrollLimit = 200;

  function scrollBack() {
    if (scroll >= scrollLimit) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <Button
      className={clsx(
        `${styles.scrollBack}`,
        scroll < scrollLimit && `${styles.hidden}`
      )}
      onClick={scrollBack}
    >
      <ArrowUp size={24} />
    </Button>
  );
}
