import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import { useLineItem } from '../contexts/line-item';
import { useActiveLine } from '../contexts/active-line';
import { ListItemLine } from './list-item-line';

import { type ResumeData } from 'src/app/data/resume';

import * as fieldStyles from './fields.css';

function FieldListItemText({
  value = '',
  field,
  label,
}: {
  value?: string;
  label: string;
  field: keyof ResumeData;
}) {
  const { isActive } = useLineItem();

  if (isActive) {
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
          value ? fieldStyles.fieldValueLabel : fieldStyles.fieldEmptyLabel
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
  const { next } = useActiveLine();
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const $input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  useHotkeys(
    'enter, tab',
    () => {
      updateTextField(field, inputValue.trim());
      next();
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
      className={fieldStyles.inputText}
      placeholder={placeholder}
      value={inputValue}
      onChange={(ev) => setInputValue(ev.target.value)}
    />
  );
}

export { FieldListItemText };
