import { InputProps } from '@/app/lib/definitions';
import styles from './TextInput.module.css';

export default function TextInput(props: InputProps) {
  return (
    <div className={styles.group}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
        name={props.name}
        id={props.name}
        defaultValue={props.value ? props.value : ''}
      />
    </div>
  );
}
