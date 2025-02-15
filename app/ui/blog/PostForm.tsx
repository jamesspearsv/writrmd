'use client';

import TextInput from '@/app/ui/forms/TextInput';
import ListInput from '@/app/ui/forms/ListInput';
import TextAreaInput from '@/app/ui/forms/TextAreaInput';

export default function PostForm() {
  // todo: Implement useSererAction
  // todo: add form styling
  function handleSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const elements = e.currentTarget.elements;
    const names = ['title', 'author', 'excerpt', 'tags', 'content'];
    names.forEach((name) => console.log(elements.namedItem(name).value));
  }

  return (
    <div>
      <form action="" onSubmit={handleSubmission}>
        <fieldset>
          <TextInput name="title" label="Title" />
          <TextInput name="author" label="Author" />
          <TextInput name="excerpt" label="Excerpt" />
          <ListInput name="tags" label="Tags" limit={3} />
        </fieldset>
        <fieldset>
          <TextAreaInput name="content" label="Post Body" />
        </fieldset>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
