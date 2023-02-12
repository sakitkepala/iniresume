import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from '../contexts/resume-editor';
import {
  useEditableLinesManager,
  useListItemEditorDisclosure,
} from './line-editors';
import * as lineStyles from './line-editors.css';
import * as styles from './gender-editor.css';

const VALUE_LABEL: { [gender: string]: string } = {
  male: 'Laki-laki',
  female: 'Perempuan',
};

function GenderEditor() {
  const { resume, updateTextField } = useResumeEditor();
  const { resetActiveLine } = useEditableLinesManager();
  const { isOpen, open, close } = useListItemEditorDisclosure();

  const data = resume?.gender;
  const value = typeof data === 'string' ? data : '';

  const handleSave = (value: string) => {
    if (updateTextField && close) {
      updateTextField('gender', value || '');
      close();
    }
  };

  useHotkeys('esc', () => resetActiveLine?.(), {
    enabled: isOpen,
    enableOnFormTags: true,
    preventDefault: true,
  });

  if (isOpen) {
    return (
      <span className={styles.openEditorWrapper}>
        <span
          className={styles.genderSelector}
          onClick={(ev) => {
            ev.stopPropagation();
            handleSave('female');
          }}
        >
          {VALUE_LABEL['female']}
        </span>
        <span>&#47;</span>
        <span
          className={styles.genderSelector}
          onClick={(ev) => {
            ev.stopPropagation();
            handleSave('male');
          }}
        >
          {VALUE_LABEL['male']}
        </span>
        <span>&#47;</span>
        <CustomGenderTextInput
          defaultValue={value === 'male' || value === 'female' ? '' : value}
          onSave={handleSave}
        />
      </span>
    );
  }

  const labelStyle = value
    ? lineStyles.editorValueLabel
    : lineStyles.editorPlaceholderLabel;

  return (
    <span className={labelStyle} onClick={open}>
      {VALUE_LABEL[value] || value || '...isi gender'}
    </span>
  );
}

function CustomGenderTextInput({
  defaultValue,
  onSave,
}: {
  defaultValue?: string;
  onSave: (value: string) => void;
}) {
  const $input = React.useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = React.useState(false);

  useHotkeys('enter, tab', () => onSave($input.current?.value || ''), {
    enabled: isOpen,
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useEffect(() => {
    isOpen && $input.current?.focus();
  }, [isOpen]);

  if (isOpen) {
    return (
      <input
        ref={$input}
        type="text"
        className={lineStyles.plainTextInput}
        placeholder="Teks yang menunjukkan gender..."
        defaultValue={defaultValue}
      />
    );
  }

  return (
    <span
      className={styles.genderSelector}
      onClick={(ev) => {
        ev.stopPropagation();
        setOpen(true);
      }}
    >
      custom{defaultValue ? <> ({defaultValue})</> : '...'}
    </span>
  );
}

export { GenderEditor };
