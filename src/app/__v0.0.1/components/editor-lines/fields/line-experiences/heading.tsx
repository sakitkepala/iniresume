import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useEditableLinesManager } from '../../contexts/editable-lines-manager';
import { useExperienceEditor } from './context';
import { useLineDisclosure } from '../../components/line';

import { clsx } from 'clsx';

import * as lineStyles from '../../components/line.css';
import * as fieldStyles from '../common-styles.css';
import * as styles from './experiences.css';

function LineExperienceTitle({
  children,
  defaultOpen = false,
  label,
  experienceId,
}: React.PropsWithChildren<{
  defaultOpen?: boolean;
  label: string;
  experienceId: string;
}>) {
  const { updateExperience } = useResumeEditor();
  const { activateLine } = useEditableLinesManager();
  const { closeExperience } = useExperienceEditor();
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';

  useHotkeys('esc', closeExperience, {
    enableOnFormTags: true,
  });

  React.useEffect(() => {
    defaultOpen && activateLine(experienceId + '-experience-title');
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
            updateExperience(experienceId || '', 'title', value);
            setTimeout(() => {
              activateLine(experienceId + '-experience-employer');
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

function LineExperienceEmployer({
  children,
  label,
  experienceId,
}: React.PropsWithChildren<{
  label: string;
  experienceId: string;
}>) {
  const { updateExperience } = useResumeEditor();
  const { activateLine } = useEditableLinesManager();
  const { closeExperience } = useExperienceEditor();
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';

  useHotkeys('esc', closeExperience, {
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
            updateExperience(experienceId || '', 'employer', value);
            setTimeout(() => {
              activateLine(experienceId + '-experience-description');
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

export { LineExperienceTitle, LineExperienceEmployer };
