'use client';

import { GenericInputProps } from '@/app/lib/definitions';
import { useState } from 'react';
import Markdown from 'marked-react';
import styles from './TextAreaInput.module.css';
import clsx from 'clsx';

interface TextAreaInputProps extends GenericInputProps {
  value: string;
}

export default function TextAreaInput(props: TextAreaInputProps) {
  const [preview, setPreview] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    console.log(e.currentTarget.value);
    props.updateValue(props.name, e.currentTarget.value);
  }

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
      {!preview ? (
        <textarea
          className={clsx(
            `${styles.textarea}`,
            props.error && `${styles.error}`
          )}
          value={props.value}
          onChange={handleChange}
          placeholder="Start writing here..."
        />
      ) : (
        <div
          className={clsx(
            `${styles.previewArea}`,
            !props.value && `${styles.previewPlaceholder}`
          )}
        >
          <Markdown
            value={
              props.value
                ? props.value
                : 'Write something to see a preview here'
            }
          />
        </div>
      )}
      {props.error && <div className={styles.error}>{props.error}</div>}
    </div>
  );
}
