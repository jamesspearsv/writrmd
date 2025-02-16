'use client';

import TextInput from '@/app/ui/forms/TextInput';
import ListInput from '@/app/ui/forms/ListInput';
import TextAreaInput from '@/app/ui/forms/TextAreaInput';
import { startTransition, useActionState, useEffect, useRef } from 'react';
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
  const formRef = useRef<HTMLFormElement | null>(null);
  const [state, formAction] = useActionState(addNewPost, initialState);

  /* 
  todo: prevent form submission on enter keypress.
  Users should be able to submit form by clicking submit button or entering a mete key combination (e.g. ctrl + enter or cmd + enter) 
  */

  /* 
  Might be useful for adding additional client side validation
  */
  // function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   console.log(e);
  //   console.log(formRef);
  //   if (formRef.current) {
  //     startTransition(() =>
  //       formAction(new FormData(formRef.current as HTMLFormElement))
  //     );
  //     console.log('submitted!');
  //   }
  // }

  // bug: this prevents the textarea from entering new lines
  // todo: prevent submission when enter key is pressed 
  function handleChange(e: React.KeyboardEvent<HTMLFormElement>) {
    // check for key combinations to submit form
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('pressed enter');
      return;
    }
  }

  return (
    <div className={styles.container}>
      <form
        action={formAction}
        className={styles.form}
        autoComplete="off"
        // onSubmit={handleSubmission}
        ref={formRef}
        onKeyDown={handleChange}
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
          <TextInput name="excerpt" label="Excerpt" />
          <ListInput
            name="tags"
            label="Tags"
            limit={3}
            value={state.error ? state.prevValues.tags : undefined}
          />
          <SubmitInput value="Publish Post" />
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
