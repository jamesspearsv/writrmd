import { InputProps } from '@/app/lib/definitions';
import './form.css';

export default function TextAreaInput(props: InputProps) {
  return (
    <div className="form-group">
      <textarea
        aria-label={props.label}
        name={props.name}
        id={props.name}
        defaultValue={props.value ? props.value : ''}
        placeholder="Start writing here..."
      />
    </div>
  );
}
