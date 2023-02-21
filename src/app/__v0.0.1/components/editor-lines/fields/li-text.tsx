import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import { useEditableLinesManager } from '../contexts/editable-lines-manager';
import { useLineDisclosure } from '../components/line';
import { ListItemLine } from './list-item-line';

import { type ResumeData } from 'src/app/data/resume';
import { type LineComponentProps } from '../components/line-legacy';

import * as commonStyles from './common-styles.css';

function LineListItemText({
  children,
  field,
  label,
}: LineComponentProps & {
  children: string;
  label: string;
  field: keyof ResumeData;
}) {
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';

  if (isOpen) {
    return (
      <ListItemLine muted>
        <PlainTextInput
          field={field}
          initialValue={value}
          placeholder={label}
        />
      </ListItemLine>
    );
  }

  return (
    <ListItemLine muted={!value}>
      <span
        className={
          value ? commonStyles.fieldValueLabel : commonStyles.fieldEmptyLabel
        }
      >
        {value || label}
      </span>
    </ListItemLine>
  );
}

function PlainTextInput({
  initialValue = '',
  placeholder,
  field,
}: {
  initialValue?: string;
  placeholder?: string;
  field: keyof ResumeData;
}) {
  const { updateTextField } = useResumeEditor();
  const { focusNext } = useEditableLinesManager();
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const $input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  useHotkeys(
    'enter, tab',
    () => {
      updateTextField(field, inputValue.trim());
      setTimeout(focusNext);
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  return (
    <input
      ref={$input}
      type="text"
      className={commonStyles.inputText}
      placeholder={placeholder}
      value={inputValue}
      onChange={(ev) => setInputValue(ev.target.value)}
    />
  );
}

export { LineListItemText };
