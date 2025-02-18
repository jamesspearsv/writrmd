import { GenericInputProps } from '@/app/lib/definitions';
import styles from './TextInput.module.css';

interface TextInputProps extends GenericInputProps {
  value: string;
}

export default function TextInput(props: TextInputProps) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    props.updateValue(props.name, e.currentTarget.value);
  }

  return (
    <div className={styles.group}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
        name={props.name}
        id={props.name}
        value={props.value}
        onChange={handleChange}
      />
    </div>
  );
}
