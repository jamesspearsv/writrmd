'use client';

import { GenericInputProps } from '@/app/lib/definitions';
import React, { useRef, useState } from 'react';
import Markdown from 'marked-react';
import styles from './TextAreaInput.module.css';
import clsx from 'clsx';

// const specialChars: { [key: number]: number } = {
//   34: 34, // Double quotation mark
//   39: 39, // Apostrophe
//   40: 41, // Left parenthesis
//   91: 93, // Left square bracket
//   123: 125, // Left curly bracket
// };

interface TextAreaInputProps extends GenericInputProps {
  value: string;
}

export default function TextAreaInput(props: TextAreaInputProps) {
  const [preview, setPreview] = useState(false);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    props.updateValue(props.name, value);
  }

  function handleRichText(e: React.MouseEvent<HTMLButtonElement>) {
    if (!editorRef.current) return;
    let value = props.value;
    if (e.currentTarget.dataset.action === 'heading') {
      value = `${value}# `;
      // todo: insert content at current selection location
      // https://developer.mozilla.org/en-US/docs/Web/API/HTMLTextAreaElement
      console.log(editorRef.current.selectionStart);
      editorRef.current.setSelectionRange(value.length - 1, value.length - 1);
      editorRef.current.focus();
    }
    props.updateValue(props.name, value);
  }

  return (
    <div className={styles.group}>
      <div>
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
        <div className={styles.rteControls}>
          <button onClick={handleRichText} data-action="heading">
            heading
          </button>
          <button>bold</button>
          <button>italic</button>
        </div>
      </div>
      {!preview ? (
        <div className={styles.textareaContainer} data-content={props.value}>
          <textarea
            ref={editorRef}
            className={clsx(
              `${styles.textarea}`,
              props.error && `${styles.error}`
            )}
            value={props.value}
            onChange={handleChange}
            placeholder="Start writing here..."
          />
        </div>
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
