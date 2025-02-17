import styles from './StyledButton.module.css';
import clsx from 'clsx';

export default function StyledButton({
  variation,
  className,
  style,
  children,
  onClick,
  ref,
}: {
  variation?: 'circle' | 'rounded';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  ref: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        `${styles.base}`,
        variation && `${styles[variation]}`,
        className && className
      )}
      style={style}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
