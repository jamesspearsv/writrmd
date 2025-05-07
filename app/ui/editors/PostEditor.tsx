'use client';

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  CommonInputProps,
  PostContent,
  PostEditorAction,
} from '@/app/lib/definitions';
import { savePost } from '@/app/lib/actions';
import styles from './PostEditor.module.css';
import StyledButton from '@/app/ui/common/StyledButton';
import clsx from 'clsx';
import { Sidebar } from 'react-feather';
import Input from '@/app/ui/inputs/Input';
import TextArea from '@/app/ui/inputs/TextArea';
import List from '@/app/ui/inputs/List';
import Toggle from '@/app/ui/inputs/Toggle';

const initialLocalState: PostContent = {
  title: '',
  author: '',
  content: '',
  tags: [],
  excerpt: '',
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
  post?: PostContent;
  slug?: string;
  date?: string;
}) {
  // action state management for editor submission
  const [actionState, editorAction] = useActionState(
    savePost,
    initialActionState
  );
  // local state management for current editor data
  const [editorData, setEditorData] = useState<PostContent>(
    props.post ? props.post : initialLocalState
  );
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const submitButtonRef = useRef<HTMLButtonElement | null>(null);

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

  function submitEditorData() {
    startTransition(() => {
      editorAction({
        post: editorData,
        slug: props.slug,
        date: props.date,
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
    if (typeof value === typeof editorData[key as keyof PostContent]) {
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
              key: 'content',
              value: editorData.content,
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
            disabled={props.slug ? true : false}
            // variant="borderless"
            // size="large"
            error={actionState.errors.title ? true : false}
            controller={{
              key: 'title',
              value: editorData.title,
              updateValue,
            }}
          />
          <Input
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
          />
          <Input
            name="excerpt"
            label="Excerpt"
            error={actionState.errors.excerpt ? true : false}
            controller={{
              key: 'excerpt',
              value: editorData.excerpt,
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
              value: editorData.tags,
              updateValue,
            }}
          />
        </div>
      </div>
    </div>
  );
}
