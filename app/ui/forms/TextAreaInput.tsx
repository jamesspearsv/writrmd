import { InputProps } from '@/app/lib/definitions';

export default function TextAreaInput(props: InputProps) {
  return (
    <div>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea name={props.name} id={props.name} />
    </div>
  );
}
