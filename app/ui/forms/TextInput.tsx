import { InputProps } from '@/app/lib/definitions';
import './form.css';

export default function TextInput(props: InputProps) {
  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="text" name={props.name} />
    </div>
  );
}
