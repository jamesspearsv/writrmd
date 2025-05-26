'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';
import { CommonInputProps, PostEditorAction } from '@/app/lib/definitions';
import { savePost } from '@/app/lib/actions';
import styles from './PostEditor.module.css';
import StyledButton from '@/app/ui/common/StyledButton';
import clsx from 'clsx';
import { Sidebar } from 'react-feather';
import Input from '@/app/ui/inputs/Input';
import TextArea from '@/app/ui/inputs/TextArea';
import List from '@/app/ui/inputs/List';
import Toggle from '@/app/ui/inputs/Toggle';
import { Post } from '@/app/lib/types';

// TODO: Simplify state management and input params
const NewPost: Post = {
  title: '',
  body: '',
  published: false,
};

const initialActionState: PostEditorAction = {
  ok: true,
  message: null,
  errors: {},
};

/*************************
 * COMPONENT STARTS HERE *
 ************************/
export default function PostEditor(props: {
  post?: Post; // KEEP THIS UNTIL REFACTORING IS COMPLETE
  id?: number;
}) {
  // action state management for editor submission
  const [actionState, editorAction] = useActionState(
    savePost,
    initialActionState
  );
  // local state management for current editor data
  const [editorData, setEditorData] = useState<Post>(
    props.post
      ? ({
          title: props.post.title,
          body: props.post.body,
          published: props.post.published,
          date: props.post.date,
          excerpt: props.post.excerpt,
          tags: props.post.tags,
          slug: props.post.slug,
        } as Post)
      : NewPost
  );
  const [sidebarHidden, setSidebarHidden] = useState(false);

  // Add keyboard listener to body for cmd | ctrl + enter submission
  useEffect(() => {
    const controller = new AbortController();
    document.body.addEventListener(
      'keydown',
      (e) => {
        if (!e.metaKey) return;
        console.log(e.key);
        const shortcuts = {
          '\\': () => setSidebarHidden((sidebarHidden) => !sidebarHidden),
          Enter: () => submitEditorData(),
        };

        if (e.metaKey && Object.keys(shortcuts).includes(e.key))
          shortcuts[e.key as keyof typeof shortcuts]();
      },
      { signal: controller.signal }
    );
    return () => controller.abort();
  });

  function submitEditorData() {
    startTransition(() => {
      editorAction({
        post: editorData,
        id: props.id,
      });
    });
  }

  // update editorData based on the PostContent type
  const updateValue: CommonInputProps<
    string | string[] | boolean
  >['controller']['updateValue'] = (key, value) => {
    // check that key exists in current data object
    if (!Object.keys(editorData).includes(key)) return;

    // check that typeof value === typeof Data[key]
    if (typeof value === typeof editorData[key as keyof Post]) {
      setEditorData({ ...editorData, [key]: value });
    }
  };

  return (
    <div>
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
          Save
        </StyledButton>

        <StyledButton
          className={clsx(
            `${styles.sidebarButton}`,
            !sidebarHidden && `${styles.open}`
          )}
          onClick={() => {
            setSidebarHidden((hidden) => !hidden);
          }}
        >
          <Sidebar size={20} />
        </StyledButton>
      </div>
      <div className={styles.container}>
        {/* POST CONTENT TEXTAREA */}
        <div className={styles.editor}>
          <TextArea
            name="content"
            error={actionState.errors.content ? true : false}
            placeholder="Begin writing your post..."
            controller={{
              key: 'body',
              value: editorData.body,
              updateValue,
            }}
            sticky
          ></TextArea>
        </div>
        {/* FRONTMATTER FIELDS */}
        <div
          className={clsx(
            `${styles.frontmatter}`,
            sidebarHidden && `${styles.hidden}`
          )}
        >
          <Toggle
            name="published"
            label="Published"
            error={actionState.errors.published ? true : false}
            controller={{
              key: 'published',
              value: editorData.published,
              updateValue,
            }}
          />
          <Input
            name="title"
            placeholder="Post Title"
            label="Title"
            // variant="borderless"
            // size="large"
            error={actionState.errors.title ? true : false}
            controller={{
              key: 'title',
              value: editorData.title,
              updateValue,
            }}
          />
          {/* <Input
            name="author"
            placeholder="Author"
            label="Author"
            // variant="borderless"
            // size="medium"
            error={actionState.errors.author ? true : false}
            controller={{
              key: 'author',
              value: editorData.author,
              updateValue,
            }}
          /> */}
          <Input
            name="excerpt"
            label="Excerpt"
            error={actionState.errors.excerpt ? true : false}
            controller={{
              key: 'excerpt',
              value: editorData.excerpt || '',
              updateValue,
            }}
          />
          <List
            name="tags"
            label="Tags"
            error={actionState.errors.tags ? true : false}
            limit={3}
            controller={{
              key: 'tags',
              value: editorData.tags || [],
              updateValue,
            }}
          />
        </div>
      </div>
    </div>
  );
}
