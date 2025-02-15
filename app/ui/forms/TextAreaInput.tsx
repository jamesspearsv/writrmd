import { InputProps } from '@/app/lib/definitions';
import './form.css';

export default function TextAreaInput(props: InputProps) {
  return (
    <div className='form-group'>
      <label htmlFor={props.name}>{props.label}</label>
      <textarea name={props.name} />
    </div>
  );
}
