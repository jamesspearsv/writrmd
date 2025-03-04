'use client';

import { GenericInputProps } from '@/app/lib/definitions';
import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'marked-react';
import styles from './TextAreaInput.module.css';
import clsx from 'clsx';

interface TextAreaInputProps extends GenericInputProps {
  value: string;
}

export default function TextAreaInput(props: TextAreaInputProps) {
  const [preview, setPreview] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
      editorRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    props.updateValue(props.name, value);
  }

  function handleRichText(e: React.MouseEvent<HTMLButtonElement>) {
    if (!editorRef.current) return;
    const editor = editorRef.current;
    // store a copy of the current editor content
    let value = props.value;
    // get the current cursor position
    const selectionPosition = editor.selectionStart;
    let newPosition = selectionPosition;
    // split current value at current selection index
    const valuePart1 = value.slice(0, selectionPosition);
    const valuePart2 = value.slice(selectionPosition);
    // get the selected action
    const action = e.currentTarget.dataset.action;

    /*
    todo: add support for additional formatting options
    - code blocks
    - lists
    - quotes
    */
    switch (action) {
      case 'heading':
        // todo: add conditional for heading not at the start of the current value
        value = valuePart1 + '# ' + valuePart2;
        newPosition = selectionPosition + 2;
        break;
      case 'bold':
        value = valuePart1 + '****' + valuePart2;
        newPosition = selectionPosition + 2;
        break;
      case 'italic':
        value = valuePart1 + '__' + valuePart2;
        newPosition = selectionPosition + 1;
      default:
        break;
    }

    props.updateValue(props.name, value);
    setCursorPosition(newPosition);
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
          <button onClick={handleRichText} data-action="bold">
            bold
          </button>
          <button onClick={handleRichText} data-action="italic">
            italic
          </button>
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
            gfm={true}
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
