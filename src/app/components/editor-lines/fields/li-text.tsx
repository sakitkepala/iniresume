import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import { useEditableLinesManager } from '../contexts/editable-lines-manager';
import { useRegisterEditable, useLineDisclosure } from '../components/line';
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
  useRegisterEditable();
  const { updateTextField } = useResumeEditor();
  const { focusNext } = useEditableLinesManager();
  const { isOpen } = useLineDisclosure();
  const value = typeof children === 'string' ? children : '';
  const [inputValue, setInputValue] = React.useState<string>(value);
  const $input = React.useRef<HTMLInputElement>(null);

  useHotkeys(
    'enter, tab',
    () => {
      focusNext();
      updateTextField(field, inputValue.trim());
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

  if (isOpen) {
    return (
      <ListItemLine muted>
        <input
          ref={$input}
          type="text"
          className={commonStyles.inputText}
          placeholder={label}
          value={inputValue}
          onChange={(ev) => setInputValue(ev.target.value)}
        />
      </ListItemLine>
    );
  }

  return (
    <ListItemLine muted={!inputValue}>
      <span
        className={
          inputValue
            ? commonStyles.fieldValueLabel
            : commonStyles.fieldEmptyLabel
        }
      >
        {inputValue || label}
      </span>
    </ListItemLine>
  );
}

export { LineListItemText };
