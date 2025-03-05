'use client';

import { GenericInputProps } from '@/app/lib/definitions';
import React, { useEffect, useRef, useState } from 'react';
import Markdown from 'marked-react';
import styles from './TextAreaInput.module.css';
import clsx from 'clsx';
import { Bold, Hash, Italic } from 'react-feather';

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

  function insertSyntax(syntax: string, cursorOffset: number) {
    if (!editorRef.current) return;
    const editor = editorRef.current;
    // get the current cursor position
    const selectionPosition = editor.selectionStart;
    // split current value at current selection index
    const v1 = props.value.slice(0, selectionPosition);
    const v2 = props.value.slice(selectionPosition);
    // Insert syntax and update value
    const newValue = v1 + syntax + v2;
    const newPosition = selectionPosition + cursorOffset;

    props.updateValue(props.name, newValue);
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
          <RichTextButton
            syntax="# "
            cursorOffset={2}
            insertSyntax={insertSyntax}
          >
            <Hash />
          </RichTextButton>
          <RichTextButton
            syntax="****"
            cursorOffset={2}
            insertSyntax={insertSyntax}
          >
            <Bold />
          </RichTextButton>
          <RichTextButton
            syntax="__"
            cursorOffset={1}
            insertSyntax={insertSyntax}
          >
            <Italic />
          </RichTextButton>
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

function RichTextButton(props: {
  syntax: string; // Markdown syntax to insert
  cursorOffset: number; // Number of indices to move cursor after insert
  insertSyntax: (syntax: string, cursorOffset: number) => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={() => props.insertSyntax(props.syntax, props.cursorOffset)}
    >
      {props.children}
    </button>
  );
}
