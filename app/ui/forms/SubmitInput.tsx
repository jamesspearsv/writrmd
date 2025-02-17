import styles from './SubmitInput.module.css';

export default function SubmitInput({
  value,
  ref,
}: {
  value: string;
  ref?: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div className={styles.group}>
      <button type="submit" ref={ref}>
        {value}
      </button>
    </div>
  );
}
