import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from '../contexts/resume-editor';
import {
  useEditableLinesManager,
  useListItemEditorDisclosure,
} from './line-editors';
import { clsx } from 'clsx';
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
  const [isCustomFieldOpen, setCustomFieldOpen] = React.useState(false);

  const data = resume?.gender;
  const value = typeof data === 'string' ? data : '';
  const isSelected = (option: string) => option === value;

  const handleSave = (value: string) => {
    if (updateTextField && close) {
      updateTextField('gender', value || '');
      setCustomFieldOpen(false);
      close();
    }
  };

  useHotkeys(
    'esc',
    () => {
      resetActiveLine?.();
      setCustomFieldOpen(false);
    },
    {
      enabled: isOpen,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  if (isOpen) {
    return (
      <span className={styles.openEditorWrapper}>
        {!isCustomFieldOpen &&
          _getSortedOptions(value).map((option) => (
            <React.Fragment key={option}>
              <span
                className={clsx(
                  isSelected(option)
                    ? lineStyles.editorValueLabel
                    : styles.genderSelector
                )}
                onClick={(ev) => {
                  ev.stopPropagation();
                  handleSave(option);
                }}
              >
                {VALUE_LABEL[option]}
              </span>
              <span className={styles.optionSeparator}>&#47;</span>
            </React.Fragment>
          ))}
        <CustomGenderTextInput
          key={value || 'field-custom-gender'}
          defaultValue={value === 'male' || value === 'female' ? '' : value}
          onOpen={() => setCustomFieldOpen(true)}
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

function _getSortedOptions(value: string) {
  const femaleFirst = ['female', 'male'];
  const maleFirst = ['male', 'female'];
  if (!value) {
    return femaleFirst;
  }
  if (femaleFirst[0] === value) {
    return femaleFirst;
  }
  return maleFirst;
}

function CustomGenderTextInput({
  defaultValue,
  onOpen,
  onSave,
}: {
  defaultValue?: string;
  onOpen?: () => void;
  onSave: (value: string) => void;
}) {
  const $input = React.useRef<HTMLInputElement>(null);
  const [isOpen, setOpen] = React.useState(false);
  const isSelected =
    defaultValue && defaultValue !== 'female' && defaultValue !== 'male';

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
      className={clsx(
        isSelected ? lineStyles.editorValueLabel : styles.genderSelector
      )}
      onClick={(ev) => {
        ev.stopPropagation();
        setOpen(true);
        onOpen?.();
      }}
    >
      label custom{defaultValue ? <> ({defaultValue})</> : '...'}
    </span>
  );
}

export { GenderEditor };
