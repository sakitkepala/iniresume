import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';

import { clsx } from 'clsx';

import * as fieldStyles from './fields.css';
import * as styles from './field-paragraph.css';

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
      label="Deskripsikan pekerjaannya"
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
      label="Isi deskripsi pendidikan bila perlu (bisa dikosongi)"
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
  const { isActive } = useActiveLine();

  if (isActive) {
    return (
      <ParagraphTextInput
        initialValue={value}
        placeholder={label}
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
  onSave,
}: {
  initialValue?: string;
  placeholder?: string;
  onSave: (value: string) => void;
}) {
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
    <div className={styles.autogrowingWrapper}>
      <textarea
        ref={$textarea}
        rows={1}
        className={styles.textarea}
        placeholder={placeholder}
        value={inputValue}
        onChange={(ev) => setInputValue(ev.target.value)}
      />
      <div className={clsx(styles.textarea, styles.autogrowingBase)}>
        {inputValue}
      </div>
    </div>
  );
}

export {
  FieldParagraph,
  FieldExperienceDescription,
  FieldEducationDescription,
};
