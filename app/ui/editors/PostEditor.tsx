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
import { writeNewPost } from '@/app/lib/actions';
import styles from './PostEditor.module.css';
import StyledButton from '@/app/ui/common/StyledButton';
import clsx from 'clsx';
import { Sidebar, XCircle } from 'react-feather';
import Input from '@/app/ui/inputs/Input';
import TextArea from '@/app/ui/inputs/TextArea';
import List from '@/app/ui/inputs/List';

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

  function submitEditorData() {
    startTransition(() => {
      editorAction(editorData);
    });
  }

  // update editorData based on the PostContent type
  const updateValue: CommonInputProps<
    string | string[]
  >['controller']['updateValue'] = (key, value) => {
    // check that key exists in current data object
    if (!Object.keys(editorData).includes(key)) return;

    // check that typeof value === typeof Data[key]
    if (typeof value === typeof editorData[key as keyof PostContent]) {
      setEditorData({ ...editorData, [key]: value });
    }
  };

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
      {/* OPTIONAL EDITOR FIELDS */}
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
      {/* REQUIRED EDITOR FIELDS */}
      <TextArea
        name="content"
        error={actionState.errors.content ? true : false}
        placeholder="Begin writing your post..."
        controller={{
          key: 'content',
          value: editorData.content,
          updateValue,
        }}
      >
        <Input
          name="title"
          placeholder="Post Title"
          variant="borderless"
          size="large"
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
          variant="borderless"
          size="medium"
          error={actionState.errors.author ? true : false}
          controller={{
            key: 'author',
            value: editorData.author,
            updateValue,
          }}
        />
      </TextArea>
    </div>
  );
}
