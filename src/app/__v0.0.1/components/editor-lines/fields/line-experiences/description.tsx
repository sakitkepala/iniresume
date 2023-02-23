import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useExperienceEditor } from './context';
import { useLineDisclosure } from '../../components/line';

import { clsx } from 'clsx';

import * as fieldStyles from '../common-styles.css';
import * as styles from './experiences.css';

function LineExperienceDescription({
  children,
  label = 'Deskripsikan pekerjaannya',
  experienceId,
}: React.PropsWithChildren<{
  label?: string;
  experienceId: string;
}>) {
  const { updateExperience } = useResumeEditor();
  const { closeExperience } = useExperienceEditor();
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';

  useHotkeys('esc', closeExperience, {
    enableOnFormTags: true,
  });

  if (isOpen) {
    return (
      <ParagraphTextInput
        initialValue={value}
        placeholder={label}
        onSave={(value) => {
          updateExperience(experienceId || '', 'description', value);
          setTimeout(closeExperience);
        }}
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

export { LineExperienceDescription };
