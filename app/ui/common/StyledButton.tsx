import styles from './StyledButton.module.css';
import clsx from 'clsx';

export default function StyledButton(props: {
  variation?: 'circle' | 'rounded';
  className?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ref?: React.RefObject<HTMLButtonElement | null>;
  alt?: string;
  type?: 'button' | 'submit' | 'reset';
}) {
  return (
    <button
      ref={props.ref}
      type={props.type || 'button'}
      className={clsx(
        `${styles.base}`,
        props.variation && `${styles[props.variation]}`,
        props.className && props.className
      )}
      style={props.style}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
