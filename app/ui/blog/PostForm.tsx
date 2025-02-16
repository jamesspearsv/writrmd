'use client';

import TextInput from '@/app/ui/forms/TextInput';
import ListInput from '@/app/ui/forms/ListInput';
import TextAreaInput from '@/app/ui/forms/TextAreaInput';
import { useActionState } from 'react';
import { FormState } from '@/app/lib/definitions';
import { addNewPost } from '@/app/lib/actions';
import styles from './PostForm.module.css';

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
  const [state, formAction] = useActionState(addNewPost, initialState);

  return (
    <div className={styles.container}>
      <form action={formAction} className={styles.form} autoComplete="off">
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
          <input type="submit" value="Submit" />
        </fieldset>
        <fieldset className={styles.markdownEditor}>
          <TextAreaInput
            name="content"
            label="Post Body"
            value={state.error ? state.prevValues.content : undefined}
          />
        </fieldset>
      </form>
      {state.error && state.error}
    </div>
  );
}
