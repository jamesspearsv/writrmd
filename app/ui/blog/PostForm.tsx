'use client';

import TextInput from '@/app/ui/forms/TextInput';
import ListInput from '@/app/ui/forms/ListInput';
import TextAreaInput from '@/app/ui/forms/TextAreaInput';
import React, { useActionState, useEffect, useRef } from 'react';
import { FormState } from '@/app/lib/definitions';
import { addNewPost } from '@/app/lib/actions';
import styles from './PostForm.module.css';
import SubmitInput from '@/app/ui/forms/SubmitInput';

const initialState: FormState = {
  error: null,
  prevValues: {
    title: '',
    author: '',
    excerpt: '',
    tags: '',
    content: '',
  },
};

export default function PostForm() {
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);
  const [state, formAction] = useActionState(addNewPost, initialState);

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
  });

  // function submitForm(preventSubmit = false) {
  //   console.log('preventSubmit', preventSubmit);
  //   if (preventSubmit) return;
  //   if (formRef.current) {
  //     startTransition(() =>
  //       formAction(new FormData(formRef.current as HTMLFormElement))
  //     );
  //     console.log('submitted!');
  //   }
  // }

  function handleKeyPress(e: React.KeyboardEvent<HTMLFormElement>) {
    const exceptions = ['button', 'textarea'];
    const target = e.target as HTMLElement;
    if (e.key === 'Enter' && target.tagName === 'INPUT') {
      const type = (target as HTMLInputElement).type;
      if (!exceptions.includes(type)) {
        e.preventDefault();
      }
    }
  }

  return (
    <div className={styles.container}>
      <form
        action={formAction}
        className={styles.form}
        autoComplete="off"
        onKeyDown={handleKeyPress}
      >
        <fieldset className={styles.fontMatter}>
          <TextInput
            name="title"
            label="Title"
            value={state.error ? state.prevValues.title : undefined}
          />
          <TextInput
            name="author"
            label="Author"
            value={state.error ? state.prevValues.author : undefined}
          />
          {/* bug: post excerpt not saved if validation is failed */}
          <TextInput name="excerpt" label="Excerpt" />
          <ListInput
            name="tags"
            label="Tags"
            limit={3}
            value={state.error ? state.prevValues.tags : undefined}
          />
          <SubmitInput value="Publish Post" ref={submitButtonRef} />
        </fieldset>
        <fieldset className={styles.markdownEditor}>
          <TextAreaInput
            name="content"
            label="Post Body"
            value={state.error ? state.prevValues.content : undefined}
          />
        </fieldset>
      </form>
      <p>{state.error && state.error}</p>
    </div>
  );
}
