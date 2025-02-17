'use client';

import { InputProps } from '@/app/lib/definitions';
import { useEffect, useState } from 'react';
import Markdown from 'marked-react';
import styles from './TextAreaInput.module.css';
import clsx from 'clsx';

//bug: the value is not cleared when a post is successfully created. This bug is hidden by redirecting to /writr/posts if successful
// bug: default tab behavior prevents users from entering indents in the textarea
// bug: input value not updated when value prop is changed in parent
export default function TextAreaInput(props: InputProps) {
  const [value, setValue] = useState(() => {
    if (!props.value) return '';
    return props.value;
  });
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (props.value) setValue(props.value);
  }, [props.value]);

  return (
    <div className={styles.group}>
      <div className={styles.actionButtons}>
        <button
          className={clsx(!preview && `${styles.active}`)}
          type="button"
          onClick={() => setPreview(false)}
        >
          Edit
        </button>
        <button
          className={clsx(preview && `${styles.active}`)}
          type="button"
          onClick={() => setPreview(true)}
        >
          Preview
        </button>
      </div>
      <input
        type="hidden"
        name={props.name}
        id={props.name}
        aria-label={props.label}
        value={value}
      />
      {!preview ? (
        <textarea
          className={styles.textarea}
          value={value}
          onChange={(e) => setValue(e.currentTarget.value)}
          placeholder="Start writing here..."
        />
      ) : (
        <div
          className={clsx(
            `${styles.previewArea}`,
            !value && `${styles.previewPlaceholder}`
          )}
        >
          <Markdown
            value={value ? value : 'Write something to see a preview here'}
          />
        </div>
      )}
    </div>
  );
}
