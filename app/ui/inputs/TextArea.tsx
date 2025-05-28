'use client';

import React, { useEffect, useRef, useState } from 'react';
import styles from './TextArea.module.css';
import clsx from 'clsx';
import { Bold, Hash, Italic } from 'react-feather';
import MarkdownWrapper from '@/app/ui/common/MarkdownWrapper';
import { CommonInputProps } from '@/app/lib/definitions';
import ScrollBack from '@/app/ui/common/ScrollBack';

interface TextAreaProps extends CommonInputProps<string> {
  children?: React.ReactNode;
  sticky?: boolean;
}

export default function TextArea({ ...props }: TextAreaProps) {
  const [preview, setPreview] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const editorRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.setSelectionRange(cursorPosition, cursorPosition);
      // only focus the textarea when the cursor position is greater
      // than zero to avoid autofocus when the page renders
      if (cursorPosition > 0) editorRef.current.focus();
    }
  }, [cursorPosition]);

  function insertSyntax(syntax: string, cursorOffset: number) {
    if (!editorRef.current) return;
    // get the current cursor position
    const selectionPosition = editorRef.current.selectionStart;

    // split current value at current selection index
    const v1 = props.controller.value.slice(0, selectionPosition);
    const v2 = props.controller.value.slice(selectionPosition);

    // Insert syntax and update value
    const newValue = v1 + syntax + v2;
    const newPosition = selectionPosition + cursorOffset;
    console.log(newPosition);

    props.controller.updateValue(props.name, newValue);
    setCursorPosition(newPosition);
  }

  function handleTextAreaKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const shortcuts = {
      b: () => insertSyntax('****', 2),
      i: () => insertSyntax('__', 1),
      k: () => insertSyntax('[]()', 1),
      '.': () => insertSyntax('- ', 2),
      '/': () => insertSyntax('- [ ] ', 6),
    };

    // TODO: Implement a list editing mode to auto insert list syntax

    if (e.metaKey && Object.keys(shortcuts).includes(e.key)) {
      shortcuts[e.key as keyof typeof shortcuts]();
    }
  }

  return (
    // TODO: Add an info modal with keyboard shortcuts & a link to a markdown guide
    <div onKeyDown={handleTextAreaKeyDown}>
      <div
        className={clsx(
          `${styles.actions}`,
          props.sticky && `${styles.sticky}`
        )}
      >
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
            syntax="# "
            label="Heading"
            cursorOffset={2}
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
      <div className={styles.container}>
        {/* Insert children between textarea controls and input */}
        {props.children}
        {!preview ? (
          <div
            className={styles.textareaContainer}
            data-content={props.controller.value}
          >
            <textarea
              id={props.name}
              name={props.name}
              ref={editorRef}
              className={clsx(
                `${styles.textarea}`,
                props.error && `${styles.error}`
              )}
              value={props.controller.value}
              onChange={(e) => {
                props.controller.updateValue(
                  props.controller.key,
                  e.currentTarget.value
                );
              }}
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
        <ScrollBack />
      </div>
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
