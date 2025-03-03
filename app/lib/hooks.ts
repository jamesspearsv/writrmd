import { useState, useEffect } from 'react';

/**
 * Get the current window.scrollY value
 * @returns {number} Value of current window.scrollY value
 */
export function useScroll() {
  const [scroll, setScroll] = useState(window.scrollY);

  useEffect(() => {
    const controller = new AbortController();
    document.addEventListener(
      'scroll',
      () => {
        setScroll(window.scrollY);
      },
      { signal: controller.signal }
    );
    return () => controller.abort();
  });

  return scroll;
}

export function useMountCheck() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
