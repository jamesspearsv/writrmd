'use client';

import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  PostContent,
  PostEditorAction,
  ValueUpdater,
} from '@/app/lib/definitions';
import { writeNewPost } from '@/app/lib/actions';
import styles from './PostEditor.module.css';
import TextInput from '@/app/ui/editors/TextInput';
import ListInput from '@/app/ui/editors/ListInput';
import TextAreaInput from '@/app/ui/editors/TextAreaInput';
import StyledButton from '@/app/ui/common/StyledButton';
import clsx from 'clsx';
import { Sidebar, XCircle } from 'react-feather';
import Input from '@/app/ui/inputs/Input';
import TextArea from '@/app/ui/inputs/TextArea';

const initialLocalState: PostContent = {
  title: '',
  author: '',
  content: '',
  tags: [],
  excerpt: '',
};

const initialActionState: PostEditorAction = {
  ok: true,
  message: null,
  errors: {},
};

export default function PostEditor() {
  // action state management for editor submission
  const [actionState, editorAction] = useActionState(
    writeNewPost,
    initialActionState
  );
  // local state management for current editor data
  const [editorData, setEditorData] = useState<PostContent>(initialLocalState);
  const [sidebarHidden, setSidebarHidden] = useState(true);
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

  // update editorData based on the PostEditorData type
  const updateLocalState: ValueUpdater<PostContent> = (name, value) => {
    const newData = { ...editorData, [name]: value };
    setEditorData(newData);
  };

  function submitEditorData() {
    startTransition(() => {
      editorAction(editorData);
    });
  }

  function updateValue(key: keyof PostContent, value: string) {
    if (typeof key === 'string') {
      setEditorData({ ...editorData, [key]: value });
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.editorControls}>
        {actionState.errors.author && (
          <div className={styles.error}>
            Posts must have an author, title, and body
          </div>
        )}
        <StyledButton
          variation={'rounded'}
          onClick={submitEditorData}
          className={styles.publishButton}
        >
          Publish
        </StyledButton>
        <StyledButton
          className={clsx(`${styles.sidebarButton}`)}
          onClick={() => {
            setSidebarHidden((hidden) => !hidden);
          }}
        >
          <Sidebar size={20} />
        </StyledButton>
      </div>
      <div
        className={clsx(
          `${styles.frontmatter}`,
          sidebarHidden && `${styles.hidden}`
        )}
      >
        <button
          onClick={() => setSidebarHidden(true)}
          className={styles.frontmatterCloseButton}
        >
          <XCircle />
        </button>
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
      </div>
      <h3>Refactored Inputs</h3>
      {/* DEMO INPUT */}
      <TextArea<PostContent>
        name="content"
        error={actionState.errors.content ? true : false}
        placeholder="Begin writing your post..."
        controller={{
          key: 'content',
          value: editorData.content,
          updateValue,
        }}
      >
        <Input<PostContent>
          name="title"
          label="Demo Input"
          placeholder="Post Title"
          variant="borderless"
          error={actionState.errors.title ? true : false}
          controller={{
            key: 'title',
            value: editorData.title,
            updateValue,
          }}
        />
      </TextArea>
      <br />
      <hr />
      <br />
      <TextAreaInput
        name="content"
        label="Post Body"
        value={editorData.content}
        updateValue={updateLocalState}
        error={actionState.errors.content}
      >
        <TextInput
          name="title"
          value={editorData.title}
          updateValue={updateLocalState}
          error={actionState.errors.title}
          placeholder="Post Title"
          title
          autofocus
        />
      </TextAreaInput>
    </div>
  );
}
