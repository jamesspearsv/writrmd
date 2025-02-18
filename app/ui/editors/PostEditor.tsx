'use client';

import TextInput from '@/app/ui/editors/TextInput';
import React, { useActionState, useEffect, useRef, useState } from 'react';
import {
  PostEditorData,
  PostEditorState,
  ValueUpdater,
} from '@/app/lib/definitions';
import { addNewPost } from '@/app/lib/actions';
import styles from './PostEditor.module.css';
import ListInput from '@/app/ui/editors/ListInput';
import TextAreaInput from '@/app/ui/editors/TextAreaInput';

const initialLocalState: PostEditorData = {
  title: '',
  author: '',
  content: '',
  tags: [],
  excerpt: '',
};

const initialActionState: PostEditorState = {
  error: null,
  values: initialLocalState,
};

// todo: Add editor submission logic
export default function PostForm() {
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  // action state management for editor submission
  // const [state, editorAction] = useActionState(addNewPost, initialActionState);
  // local state management for current editor data
  const [editorData, setEditorData] =
    useState<PostEditorData>(initialLocalState);

  // todo: extract to hook
  // useEffect to add keyboard listener to body for cmd | ctrl + enter submission
  useEffect(() => {
    const controller = new AbortController();
    document.body.addEventListener(
      'keydown',
      (e) => {
        if (!(e.key === 'Enter' && e.metaKey)) return;
        console.log('cmd + enter');
        if (submitButtonRef.current) {
          submitButtonRef.current.click();
        }
      },
      { signal: controller.signal }
    );
    return () => controller.abort();
  });

  // local state updater that updated editorData based on the PostEditorDate type
  const updateLocalState: ValueUpdater<PostEditorData> = (name, value) => {
    const newDate = { ...editorData, [name]: value };
    setEditorData(newDate);
  };

  return (
    <div className={styles.container}>
      {Object.keys(editorData).map((item) => (
        <p key={item}>{editorData[item as keyof PostEditorData]}</p>
      ))}
      <div>
        <TextInput
          name="title"
          label="Title"
          value={editorData.title}
          updateValue={updateLocalState}
        />
        <TextInput
          name="author"
          label="Author"
          value={editorData.author}
          updateValue={updateLocalState}
        />
        <TextInput
          name="excerpt"
          label="Excerpt"
          value={editorData.excerpt}
          updateValue={updateLocalState}
        />
        <ListInput
          name="tags"
          label="Tags"
          value={editorData.tags}
          updateValue={updateLocalState}
          limit={3}
        />
        <TextAreaInput
          name="content"
          label="Post Body"
          value={editorData.content}
          updateValue={updateLocalState}
        />
      </div>
    </div>
  );
}
