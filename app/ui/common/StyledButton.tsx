import styles from './StyledButton.module.css';
import clsx from 'clsx';

export default function StyledButton({
  variation,
  className,
  style,
  children,
  onClick,
}: {
  variation?: 'circle' | 'rounded';
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
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
