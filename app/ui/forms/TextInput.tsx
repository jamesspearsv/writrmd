import { InputProps } from '@/app/lib/definitions';

export default function TextInput(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" id={props.name} name={props.name} />
    </div>
  );
}
