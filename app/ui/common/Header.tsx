import React from 'react';
import styles from './Header.module.css';

export default function Header(props: { children: React.ReactNode }) {
  return <div className={styles.header}>{props.children}</div>;
}
