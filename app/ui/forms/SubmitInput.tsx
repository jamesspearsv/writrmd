import styles from './SubmitInput.module.css';

export default function SubmitInput({ value }: { value: string }) {
  return (
    <div className={styles.group}>
      <input type="submit" value={value} />
    </div>
  );
}
