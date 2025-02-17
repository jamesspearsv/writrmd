'use client';

import TextAreaInput from '@/app/ui/forms/TextAreaInput';
import TextInput from '@/app/ui/forms/TextInput';
import {
  startTransition,
  useActionState,
  useEffect,
  useReducer,
  useRef,
} from 'react';
import { addNewPage } from '@/app/lib/actions';
import StyledButton from '@/app/ui/common/StyledButton';
import { title } from 'process';

export type PageEditorState = {
  error: string | null;
  data: PageEditorData;
};

export type PageEditorData = {
  title: string;
  content: string;
};

const initialState: PageEditorState = {
  error: null,
  data: {
    title: '',
    content: '',
  },
};

export default function AddPageForm() {
  const [state, action] = useActionState(addNewPage, initialState);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // todo: extract into a useMetaEnter hook
  useEffect(() => {
    const controller = new AbortController();

    document.body.addEventListener(
      'keydown',
      (e) => {
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
          if (!buttonRef.current) return;
          buttonRef.current.click();
        }
      },
      { signal: controller.signal }
    );

    return () => controller.abort();
  });

  function submitPage(e: React.MouseEvent<HTMLButtonElement>) {
    const fields = ['title', 'content'];
    if (!editorRef.current) return;

    const editorChildren = editorRef.current.children;
    const data: PageEditorData = {
      title: '',
      content: '',
    };

    // look into containing div for respective title and content inputs elements
    Array.from(editorChildren).forEach((child) => {
      // iterate through needed fields as defined above
      fields.forEach((field) => {
        if (child.children.namedItem(field)) {
          const input = child.children.namedItem(field) as HTMLInputElement;
          // only insert data for valid fields. Should be mostly unnecessary
          if (field === 'title' || field === 'content') {
            data[field] = input.value;
          }
        }
      });
    });

    startTransition(() => {
      action(data);
    });
  }

  return (
    <>
      <StyledButton onClick={submitPage} ref={buttonRef}>
        Add page
      </StyledButton>
      <div ref={editorRef}>
        <div>
          <p>{state.error}</p>
          <p>{state.data.title}</p>
          <p>{state.data.content}</p>
        </div>
        <TextInput label="Page Title" name="title" value={state.data.title} />
        <TextAreaInput
          label="Page Content"
          name="content"
          value={state.data.content}
        />
      </div>
    </>
  );
}
