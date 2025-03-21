import clsx from 'clsx';
import styles from './Input.module.css';

interface InputProps<T> {
  name: keyof T;
  label: string;
  error: boolean;
  variant?: 'normal' | 'borderless';
  placeholder?: string;
  controller: {
    key: keyof T;
    value: string;
    updateValue: (k: keyof T, v: string) => void;
  };
}

export default function Input<T>({
  variant = 'normal',
  ...props
}: InputProps<T>) {
  if (typeof props.name !== 'string') return;

  return (
    <div className={styles.group}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        className={clsx(
          `${styles.input}`,
          `${styles[variant]}`,
          props.error && `${styles.error}`
        )}
        placeholder={props.placeholder}
        type="text"
        name={props.name}
        id={props.name}
        value={props.controller.value}
        onChange={(e) => {
          props.controller.updateValue(
            props.controller.key,
            e.currentTarget.value
          );
        }}
      />
    </div>
  );
}
