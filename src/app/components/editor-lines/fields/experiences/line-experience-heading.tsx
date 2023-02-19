import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  type Experience,
  useResumeEditor,
} from 'src/app/contexts/resume-editor';
import { useExperienceField } from './context';
import { useLineDisclosure } from '../../components/line';

import { clsx } from 'clsx';

import * as lineStyles from '../../components/line.css';
import * as fieldStyles from '../common-styles.css';

function LineExperienceHeading({
  children,
  level = 1,
  field,
  label,
}: React.PropsWithChildren<{
  level?: string | number;
  field: keyof Experience;
  label: string;
}>) {
  const { updateTextField } = useResumeEditor();
  const { focusNext } = useExperienceField();
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';
  const [inputValue, setInputValue] = React.useState<string>(value);
  const $input = React.useRef<HTMLInputElement>(null);

  useHotkeys(
    'enter, tab',
    () => {
      focusNext();
      // TODO: update data experience
      // updateTextField(field, inputValue.trim());
    },
    {
      enabled: isOpen,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  React.useEffect(() => {
    isOpen && $input.current?.focus();
  }, [isOpen]);

  const marks: {
    [level: string | number]: string;
  } = {
    1: '#',
    2: '##',
    3: '###',
  };

  if (isOpen) {
    return (
      <span className={lineStyles.textHeading}>
        <span>{marks[level]}</span>
        <span>&nbsp;</span>
        <input
          ref={$input}
          type="text"
          className={clsx(fieldStyles.inputText, lineStyles.textHeading)}
          placeholder={label}
          value={inputValue}
          onChange={(ev) => setInputValue(ev.target.value)}
        />
      </span>
    );
  }

  return (
    <span className={lineStyles.textHeading}>
      <span>{marks[level]}</span>
      <span>&nbsp;</span>
      <span className={inputValue ? undefined : fieldStyles.fieldEmptyLabel}>
        {inputValue || label}
      </span>
    </span>
  );
}

export { LineExperienceHeading };
