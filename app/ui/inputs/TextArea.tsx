'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './TextArea.module.css';
import clsx from 'clsx';
import { Bold, Hash, Italic } from 'react-feather';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';
import { NewGenericInputProps } from '@/app/lib/definitions';

interface TextAreaProps<T> extends NewGenericInputProps<T> {
  children?: React.ReactNode;
}

export default function TextArea<T>({ ...props }: TextAreaProps<T>) {
  const [preview, setPreview] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      // only focus the editor when the cursor position is greater
      // than zero to avoid autofocus when the page renders
      if (cursorPosition > 0) editorRef.current.focus();
      editorRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.currentTarget.value;
    props.controller.updateValue(props.name, value);
  }

  function insertSyntax(syntax: string, cursorOffset: number) {
    if (!editorRef.current) return;
    const editor = editorRef.current;
    // get the current cursor position
    const selectionPosition = editor.selectionStart;

    // bug: Unexpected effects cursor positioning when editor isn't focused
    // if (editor !== document.activeElement) {
    //   selectionPosition = props.controller.value.length - 1;
    // }

    // split current value at current selection index
    const v1 = props.controller.value.slice(0, selectionPosition);
    const v2 = props.controller.value.slice(selectionPosition);
    // Insert syntax and update value
    const newValue = v1 + syntax + v2;
    const newPosition = selectionPosition + cursorOffset;

    props.controller.updateValue(props.name, newValue);
    setCursorPosition(newPosition);
  }

  return (
    <div className={styles.textareaGroup}>
      <div className={styles.actions}>
        <div className={styles.toggleControls}>
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
            syntax="## "
            label="Heading"
            cursorOffset={3}
            insertSyntax={insertSyntax}
          >
            <Hash />
          </RichTextButton>
          <RichTextButton
            syntax="****"
            label="Bold"
            cursorOffset={2}
            insertSyntax={insertSyntax}
          >
            <Bold />
          </RichTextButton>
          <RichTextButton
            syntax="__"
            label="Italic"
            cursorOffset={1}
            insertSyntax={insertSyntax}
          >
            <Italic />
          </RichTextButton>
        </div>
      </div>
      {/* Insert post title input from editor component */}
      {props.children}
      {!preview ? (
        <div
          className={styles.textareaContainer}
          data-content={props.controller.value}
        >
          <textarea
            ref={editorRef}
            className={clsx(
              `${styles.textarea}`,
              props.error && `${styles.error}`
            )}
            value={props.controller.value}
            onChange={handleChange}
            placeholder="Begin writing your post..."
          />
        </div>
      ) : (
        <div
          className={clsx(
            `${styles.previewArea}`,
            !props.controller.value && `${styles.previewPlaceholder}`
          )}
        >
          <MarkdownWrapper
            value={
              props.controller.value
                ? props.controller.value
                : 'Start writing to see a preview here'
            }
          />
        </div>
      )}
    </div>
  );
}

function RichTextButton(props: {
  syntax: string; // Markdown syntax to insert
  cursorOffset: number; // Number spaces to move cursor after insert
  label: string;
  insertSyntax: (syntax: string, cursorOffset: number) => void;
  children: React.ReactElement;
}) {
  return (
    <button
      className={styles.rteButton}
      onClick={() => props.insertSyntax(props.syntax, props.cursorOffset)}
    >
      {props.children}
      <div>{props.label}</div>
    </button>
  );
}
