import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useEditableLinesManager } from '../../contexts/editable-lines-manager';
import { useEducationEditor } from './context';
import { useLineDisclosure } from '../../components/line';

import { clsx } from 'clsx';

import * as lineStyles from '../../components/line.css';
import * as fieldStyles from '../common-styles.css';
import * as styles from './education.css';

function LineEducationSchool({
  children,
  defaultOpen = false,
  label,
  educationId,
}: React.PropsWithChildren<{
  defaultOpen?: boolean;
  label: string;
  educationId: string;
}>) {
  const { updateEducation } = useResumeEditor();
  const { activateLine } = useEditableLinesManager();
  const { closeEducation } = useEducationEditor();
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';

  useHotkeys('esc', closeEducation, {
    enableOnFormTags: true,
  });

  React.useEffect(() => {
    defaultOpen && activateLine(educationId + '-education-school');
  }, []);

  if (isOpen) {
    return (
      <span className={clsx(styles.headingWrapper, lineStyles.textHeading)}>
        <span>{'##'}</span>
        <span>&nbsp;</span>
        <HeadingTextInput
          initialValue={value}
          placeholder={label}
          onSave={(value) => {
            updateEducation(educationId || '', 'school', value);
            setTimeout(() => {
              activateLine(educationId + '-education-major');
            });
          }}
        />
      </span>
    );
  }

  return (
    <span className={clsx(styles.headingWrapper, lineStyles.textHeading)}>
      <span>{'##'}</span>
      <span>&nbsp;</span>
      <span className={value ? undefined : fieldStyles.fieldEmptyLabel}>
        {value || label}
      </span>
    </span>
  );
}

function LineEducationMajor({
  children,
  label,
  educationId,
}: React.PropsWithChildren<{
  label: string;
  educationId: string;
}>) {
  const { updateEducation } = useResumeEditor();
  const { activateLine } = useEditableLinesManager();
  const { closeEducation } = useEducationEditor();
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';

  useHotkeys('esc', closeEducation, {
    enableOnFormTags: true,
  });

  if (isOpen) {
    return (
      <span className={clsx(styles.headingWrapper, lineStyles.textHeading)}>
        <span>{'###'}</span>
        <span>&nbsp;</span>
        <HeadingTextInput
          initialValue={value}
          placeholder={label}
          onSave={(value) => {
            updateEducation(educationId || '', 'major', value);
            setTimeout(() => {
              activateLine(educationId + '-education-description');
            });
          }}
        />
      </span>
    );
  }

  return (
    <span className={clsx(styles.headingWrapper, lineStyles.textHeading)}>
      <span>{'###'}</span>
      <span>&nbsp;</span>
      <span className={value ? undefined : fieldStyles.fieldEmptyLabel}>
        {value || label}
      </span>
    </span>
  );
}

function HeadingTextInput({
  initialValue = '',
  placeholder,
  onSave,
}: {
  initialValue?: string;
  placeholder?: string;
  onSave: (value: string) => void;
}) {
  const $input = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState<string>(initialValue);

  useHotkeys('enter, tab', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  return (
    <input
      ref={$input}
      type="text"
      className={clsx(fieldStyles.inputText, lineStyles.textHeading)}
      placeholder={placeholder}
      value={inputValue}
      onChange={(ev) => setInputValue(ev.target.value)}
    />
  );
}

export { LineEducationSchool, LineEducationMajor };
