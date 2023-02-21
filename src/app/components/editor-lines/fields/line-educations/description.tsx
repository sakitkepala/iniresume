import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useEducationEditor } from './context';
import { useLineDisclosure } from '../../components/line';

import { clsx } from 'clsx';

import * as fieldStyles from '../common-styles.css';
import * as styles from './education.css';

const PLACEHOLDER_LABEL =
  'Isi deskripsi pendidikan bila perlu (bisa dikosongi)';

function LineEducationDescription({
  children,
  educationId,
}: React.PropsWithChildren<{
  educationId: string;
}>) {
  const { updateEducation } = useResumeEditor();
  const { closeEducation } = useEducationEditor();
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';

  useHotkeys('esc', closeEducation, {
    enableOnFormTags: true,
  });

  if (isOpen) {
    return (
      <ParagraphTextInput
        initialValue={value}
        placeholder={PLACEHOLDER_LABEL}
        onSave={(value) => {
          updateEducation(educationId || '', 'description', value);
          setTimeout(closeEducation);
        }}
      />
    );
  }

  return (
    <span className={value ? undefined : fieldStyles.fieldEmptyLabel}>
      {value || PLACEHOLDER_LABEL}
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

  useHotkeys('enter, tab', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useEffect(() => {
    $textarea.current?.focus();
  }, []);

  return (
    <div className={styles.textareaAutogrowingWrapper}>
      <textarea
        ref={$textarea}
        rows={1}
        className={styles.textarea}
        placeholder={placeholder}
        value={inputValue}
        onChange={(ev) => setInputValue(ev.target.value)}
      />
      <div className={clsx(styles.textarea, styles.textareaAutogrowingBase)}>
        {inputValue}
      </div>
    </div>
  );
}

export { LineEducationDescription };
