import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import {
  EditableLineWrapper,
  useEditableLineDisclosure,
} from '../components/editable-line';
import { TriggerText } from './trigger-text';
import { ListItemLine } from './list-item-line';

import { type LineComponentProps } from '../components/line';

import { clsx } from 'clsx';

import * as fieldStyles from './common-styles.css';
import * as styles from './li-gender.css';

const MALE = 'male';
const FEMALE = 'female';

const VALUE_LABEL: { [gender: string]: string } = {
  [MALE]: 'Laki-laki',
  [FEMALE]: 'Perempuan',
};

function _getGenderOptions(value: string) {
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

function LineListItemGender({
  number,
  children,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <EditableLineWrapper line={number}>
      <GenderField>{children}</GenderField>
    </EditableLineWrapper>
  );
}

function GenderField({
  children,
}: React.PropsWithChildren<LineComponentProps>) {
  const { updateTextField } = useResumeEditor();
  const { isOpen, close } = useEditableLineDisclosure();
  const [isCustomFieldOpen, setCustomFieldOpen] = React.useState(false);

  const value = typeof children === 'string' ? children : '';
  const optionIsSelected = (option: string) => option === value;

  const handleSave = (value: string) => {
    updateTextField('gender', value || '');
    close();
  };

  if (isOpen) {
    return (
      <ListItemLine muted>
        <span className={styles.fieldOpen}>
          {!isCustomFieldOpen &&
            _getGenderOptions(value).map((option, index) => (
              <React.Fragment key={option}>
                <span
                  className={clsx(
                    styles.option,
                    optionIsSelected(option)
                      ? styles.optionSelected
                      : undefined,
                    index === 0
                      ? value
                        ? styles.fakeCaret
                        : styles.fakeCaretEmpty
                      : undefined
                  )}
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleSave(option);
                  }}
                >
                  {VALUE_LABEL[option]}
                </span>
                <span className={fieldStyles.staticDisplay}>&#47;</span>
              </React.Fragment>
            ))}
          <CustomGenderTextInput
            key={value || 'field-custom-gender'}
            defaultValue={[MALE, FEMALE].includes(value) ? '' : value}
            onOpen={() => setCustomFieldOpen(true)}
            onSave={handleSave}
          />
        </span>
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
        {VALUE_LABEL[value] || value || 'Gender'}
      </span>
    </ListItemLine>
  );
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
        className={fieldStyles.inputText}
        placeholder="Label gender"
        defaultValue={defaultValue}
      />
    );
  }

  return (
    <TriggerText
      onClick={() => {
        setOpen(true);
        onOpen?.();
      }}
    >
      {defaultValue ? <>edit label ({defaultValue})</> : 'label custom'}
    </TriggerText>
  );
}

export { LineListItemGender };
