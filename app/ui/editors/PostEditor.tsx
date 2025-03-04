'use client';

import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  PostEditorData,
  PostEditorActionState,
  ValueUpdater,
} from '@/app/lib/definitions';
import { writeNewPost } from '@/app/lib/actions';
import styles from './PostEditor.module.css';
import TextInput from '@/app/ui/editors/TextInput';
import ListInput from '@/app/ui/editors/ListInput';
import TextAreaInput from '@/app/ui/editors/TextAreaInput';
import StyledButton from '@/app/ui/common/StyledButton';

const initialLocalState: PostEditorData = {
  title: '',
  author: '',
  content: '',
  tags: [],
  excerpt: '',
};

const initialActionState: PostEditorActionState = {
  ok: true,
  message: null,
  errors: {},
  values: initialLocalState,
};

export default function PostForm() {
  // action state management for editor submission
  const [actionState, editorAction] = useActionState(
    writeNewPost,
    initialActionState
  );
  // local state management for current editor data
  const [editorData, setEditorData] =
    useState<PostEditorData>(initialLocalState);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

  // reset local state is action is successful
  useEffect(() => {
    if (actionState.ok) {
      setEditorData(initialLocalState);
    }
  }, [actionState]);

  // todo: extract to hook
  // Add keyboard listener to body for cmd | ctrl + enter submission
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

  // update editorData based on the PostEditorDate type
  const updateLocalState: ValueUpdater<PostEditorData> = (name, value) => {
    const newDate = { ...editorData, [name]: value };
    setEditorData(newDate);
  };

  function submitEditorData() {
    startTransition(() => {
      editorAction(editorData);
    });
  }

  return (
    <div className={styles.container}>
      <div>
        <TextInput
          name="title"
          label="Title"
          value={editorData.title}
          updateValue={updateLocalState}
          error={actionState.errors.title}
        />
        <TextInput
          name="author"
          label="Author"
          value={editorData.author}
          updateValue={updateLocalState}
          error={actionState.errors.author}
        />
        <TextInput
          name="excerpt"
          label="Excerpt"
          value={editorData.excerpt}
          updateValue={updateLocalState}
          error={actionState.errors.excerpt}
        />
        <ListInput
          name="tags"
          label="Tags"
          value={editorData.tags}
          updateValue={updateLocalState}
          limit={3}
          error={actionState.errors.tags}
        />
        <TextAreaInput
          name="content"
          label="Post Body"
          value={editorData.content}
          updateValue={updateLocalState}
          error={actionState.errors.content}
        />
        <StyledButton variation={'rounded'} onClick={submitEditorData}>
          Publish
        </StyledButton>
      </div>
    </div>
  );
}
