'use client';

// import TextAreaInput from '@/app/ui/editors/TextAreaInput';
// import TextInput from '@/app/ui/editors/TextInput';
// import {
//   startTransition,
//   useActionState,
//   useEffect,
//   useRef,
//   useState,
// } from 'react';
// import StyledButton from '@/app/ui/common/StyledButton';
// import {
//   PageEditorActionState,
//   PageEditorData,
//   ValueUpdater,
// } from '@/app/lib/definitions';
// import { writeNewPage } from '@/app/lib/actions';

// const initialLocalState: PageEditorData = {
//   title: '',
//   content: '',
// };

// const initialActionState: PageEditorActionState = {
//   ok: true,
//   message: null,
//   errors: {},
//   values: initialLocalState,
// };

export default function PageEditor() {
  // const [actionState, editorAction] = useActionState(
  //   writeNewPage,
  //   initialActionState
  // );
  // const [localData, setLocalData] = useState(initialLocalState);
  // const buttonRef = useRef<HTMLButtonElement | null>(null);

  // useEffect(() => {
  //   const controller = new AbortController();

  //   document.body.addEventListener(
  //     'keydown',
  //     (e) => {
  //       if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
  //         if (!buttonRef.current) return;
  //         buttonRef.current.click();
  //       }
  //     },
  //     { signal: controller.signal }
  //   );

  //   return () => controller.abort();
  // });

  // useEffect(() => {
  //   if (actionState.ok) {
  //     setLocalData(initialLocalState);
  //   }
  // }, [actionState]);

  // function submitEditor() {
  //   startTransition(() => {
  //     editorAction(localData);
  //   });
  // }

  // const updateLocalState: ValueUpdater<PageEditorData> = (name, value) => {
  //   const newData = { ...localData, [name]: value };
  //   setLocalData(newData);
  // };

  return (
    <>
      <p>Deprecated. Saving for future use.</p>
      {/* <StyledButton onClick={submitEditor} ref={buttonRef}>
        Add page
      </StyledButton>
      <div>
        <TextInput
          label="Page Title"
          name="title"
          value={localData.title}
          updateValue={updateLocalState}
        />
        <TextAreaInput
          label="Page Content"
          name="content"
          value={localData.content}
          updateValue={updateLocalState}
        />
      </div> */}
    </>
  );
}
