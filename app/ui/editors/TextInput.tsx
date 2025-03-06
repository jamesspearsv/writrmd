import { GenericInputProps } from '@/app/lib/definitions';
import styles from './TextInput.module.css';
import clsx from 'clsx';

interface TextInputProps extends GenericInputProps {
  value: string;
  placeholder?: string;
  title?: boolean;
  autofocus?: boolean;
}

export default function TextInput(props: TextInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.updateValue(props.name, e.currentTarget.value);
  }

  return (
    <div className={styles.group}>
      {props.label && <label htmlFor={props.name}>{props.label}</label>}
      <input
        className={clsx(
          props.error && `${styles.error}`,
          props.title && `${styles.title}`
        )}
        aria-label={props.name}
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={handleChange}
        autoFocus={props.autofocus}
      />
      {/* {props.error && !props.title && (
        <div className={styles.error}>{props.error}</div>
      )} */}
    </div>
  );
}
