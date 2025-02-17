import { InputProps } from '@/app/lib/definitions';
import styles from './TextInput.module.css';
import { useEffect, useState } from 'react';

export default function TextInput(props: InputProps) {
  const [value, setValue] = useState(() => {
    if (props.value) return props.value;
    else return '';
  });

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props.value]);

  return (
    <div className={styles.group}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        type="text"
        name={props.name}
        id={props.name}
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
      />
    </div>
  );
}
