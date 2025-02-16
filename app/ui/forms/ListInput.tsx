import { InputProps } from '@/app/lib/definitions';
import StyledButton from '@/app/ui/common/StyledButton';
import { useRef, useState } from 'react';
import { X, Plus } from 'react-feather';
import './form.css';

// todo: add type safety to ensure limit is a positive whole number
interface ListInputProps extends InputProps {
  limit: number;
}

export default function ListInput(props: ListInputProps) {
  const [list, setList] = useState<string[]>(() => {
    if (!props.value) return [];
    const items = props.value.split(',');
    return items;
  });
  const tagRef = useRef<HTMLInputElement | null>(null);

  function addToList(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (list.length >= props.limit) return;

    const l = [...list];
    if (!tagRef || !tagRef.current?.value) return;
    l.push(tagRef.current.value);
    setList(l);
    tagRef.current.value = '';
  }

  function deleteFromList(
    e: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) {
    e.preventDefault();
    const l = [...list];
    l.splice(index, 1);
    setList(l);
  }

  const buttonStyles: React.CSSProperties = {
    backgroundColor: 'var(--primary-color)',
    color: 'var(--secondary-color)',
    padding: 0,
  };

  return (
    <div className="form-group">
      <label htmlFor={props.name}>{props.label}</label>
      <input type="hidden" value={list} name={props.name} id={props.name} />
      <input type="text" name="list" ref={tagRef} />
      {/* todo: add keyboard submission */}
      <StyledButton onClick={addToList} style={buttonStyles}>
        <Plus />
      </StyledButton>
      <div
        style={{ height: '30px', display: 'flex', gap: 'var(--spacing-size-s' }}
      >
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <p>{item}</p>
              <StyledButton
                onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                  deleteFromList(e, index)
                }
                style={buttonStyles}
              >
                <X size={18} />
              </StyledButton>
            </div>
          ))
        ) : (
          <p>Add some tags to get started</p>
        )}
      </div>
    </div>
  );
}
