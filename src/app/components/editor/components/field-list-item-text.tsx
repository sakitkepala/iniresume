import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';

import { ListItemLine } from './list-item-line';
import { AutogrowingInput } from './autogrowing-input';

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
  const { updateTextField } = useResumeEditor();
  const { isActive, next } = useActiveLine();

  if (isActive) {
    return (
      <ListItemLine muted>
        <PlainTextInput
          initialValue={value}
          placeholder={label}
          onSave={(inputValue) => {
            updateTextField(field, inputValue.trim());
            next();
          }}
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

export type PlainTextInputProps = {
  initialValue?: string;
  placeholder?: string;
  onSave: (inputValue: string) => void;
};

const PlainTextInput = React.forwardRef<
  { focus: () => void },
  PlainTextInputProps
>(({ initialValue = '', placeholder, onSave }, $ref) => {
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const $input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  useHotkeys('enter', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useImperativeHandle($ref, () => ({
    focus: () => $input.current?.focus(),
  }));

  return (
    <AutogrowingInput
      ref={$input}
      placeholder={placeholder}
      initialSize={!inputValue ? placeholder?.length : undefined}
      value={inputValue}
      onChange={setInputValue}
    />
  );
});

export { FieldListItemText, PlainTextInput };
