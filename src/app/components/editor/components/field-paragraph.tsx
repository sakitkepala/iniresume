import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useLineContents } from '../contexts/line-contents';
import { useActiveLine } from '../contexts/active-line';

import { AutogrowingTextarea } from './autogrowing-textarea';

import * as fieldStyles from './fields.css';

function FieldExperienceDescription({
  experienceId,
  value = '',
}: {
  experienceId: string;
  value?: string;
}) {
  const { updateExperience } = useResumeEditor();
  const { next } = useActiveLine();
  return (
    <FieldParagraph
      value={value}
      label="// Deskripsikan pekerjaannya"
      onSave={(description) => {
        updateExperience(experienceId, 'description', description);
        next();
      }}
    />
  );
}

function FieldEducationDescription({
  educationId,
  value = '',
}: {
  educationId: string;
  value?: string;
}) {
  const { updateEducation } = useResumeEditor();
  const { next } = useActiveLine();
  return (
    <FieldParagraph
      value={value}
      label="// Tuliskan deskripsi studi bila perlu *bisa dikosongi"
      onSave={(description) => {
        updateEducation(educationId, 'description', description);
        next();
      }}
    />
  );
}

/* ============================ */

function FieldParagraph({
  value = '',
  label,
  onSave,
}: {
  value?: string;
  label: string;
  onSave: (inputValue: string) => void;
}) {
  const { isActive, shouldPromptDirty } = useActiveLine();

  if (isActive) {
    return (
      <ParagraphTextInput
        initialValue={value}
        placeholder={label}
        onDirty={() => shouldPromptDirty()}
        onClean={() => shouldPromptDirty(false)}
        onSave={onSave}
      />
    );
  }

  return (
    <span className={value ? undefined : fieldStyles.fieldEmptyLabel}>
      {value || label}
    </span>
  );
}

function ParagraphTextInput({
  initialValue = '',
  placeholder,
  onDirty,
  onClean,
  onSave,
}: {
  initialValue?: string;
  placeholder?: string;
  onDirty?: () => void;
  onClean?: () => void;
  onSave: (value: string) => void;
}) {
  const { preventHotkey } = useLineContents();
  const $textarea = React.useRef<HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = React.useState<string>(initialValue);

  useHotkeys('enter', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useEffect(() => {
    $textarea.current?.focus();
  }, []);

  return (
    <AutogrowingTextarea
      ref={$textarea}
      placeholder={placeholder}
      value={inputValue}
      onChange={(value) => {
        const isDirty = value !== initialValue;
        isDirty && preventHotkey();
        isDirty && onDirty?.();
        !isDirty && onClean?.();
        setInputValue(value);
      }}
    />
  );
}

export {
  FieldParagraph,
  FieldExperienceDescription,
  FieldEducationDescription,
};
