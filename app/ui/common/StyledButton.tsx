import styles from './StyledButton.module.css';
import clsx from 'clsx';

export default function StyledButton({
  variation,
  className,
  style,
  children,
  handleClick,
}: {
  variation?: 'circle' | 'rounded';
  className?: string;
  style?: { readonly [key: string]: string };
  children: React.ReactNode;
  handleClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      className={clsx(
        `${styles.base}`,
        variation && `${styles[variation]}`,
        className && className
      )}
      style={style}
      onClick={handleClick}
    >
      {children}
    </button>
  );
}
