import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import {
  EditableLineWrapper,
  useEditableLineDisclosure,
} from '../components/editable-line';

import { type ResumeData } from 'src/app/data/resume';
import { type LineComponentProps } from '../components/line';

import * as commonStyles from './common-styles.css';

function LineListItemText({
  children,
  number,
  field,
  label,
}: LineComponentProps & {
  children: string;
  label: string;
  field: keyof ResumeData;
}) {
  return (
    <EditableLineWrapper line={number}>
      <ListItemTextField field={field} label={label}>
        {children}
      </ListItemTextField>
    </EditableLineWrapper>
  );
}

export type LiTextFieldProps = {
  label: string;
  field: keyof ResumeData;
};

function ListItemTextField({
  label,
  field,
  children,
}: React.PropsWithChildren<LiTextFieldProps>) {
  const { updateTextField } = useResumeEditor();
  const { isOpen, close } = useEditableLineDisclosure();
  const $input = React.useRef<HTMLInputElement>(null);

  const value = typeof children === 'string' ? children : '';

  useHotkeys(
    'enter, tab',
    () => {
      close();
      updateTextField(field, $input.current?.value || '');
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

  const listItemLine = (element: JSX.Element) => (
    <span className={commonStyles.listItemWrapper}>
      <span>-</span>
      <span>&nbsp;</span>
      {element}
    </span>
  );

  if (isOpen) {
    return listItemLine(
      <input
        ref={$input}
        type="text"
        className={commonStyles.inputText}
        placeholder={label}
        defaultValue={value}
      />
    );
  }

  const labelStyle = value
    ? commonStyles.editorValueLabel
    : commonStyles.editorPlaceholderLabel;

  return listItemLine(<span className={labelStyle}>{value || label}</span>);
}

export { LineListItemText };
