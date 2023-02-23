import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import { useActiveLine } from '../contexts/active-line';
import { TriggerText } from './trigger-text';
import { ListItemLine } from './list-item-line';

import { clsx } from 'clsx';

import * as fieldStyles from './fields.css';
import * as styles from './field-gender.css';

const MALE = 'male';
const FEMALE = 'female';

const VALUE_LABEL: { [gender: string]: string } = {
  [MALE]: 'Laki-laki',
  [FEMALE]: 'Perempuan',
};

function _getGenderOptions(value: string) {
  const femaleFirst = [FEMALE, MALE];
  const maleFirst = [MALE, FEMALE];
  if (!value || value === FEMALE) {
    return femaleFirst;
  }
  return maleFirst;
}

function FieldGender({ value = '' }: { value?: string }) {
  const { updateTextField } = useResumeEditor();
  const { isActive, next } = useActiveLine();

  if (isActive) {
    return (
      <ListItemLine muted>
        <GenderPick
          value={value}
          onSave={(value: string) => {
            updateTextField('gender', value || '');
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
        {VALUE_LABEL[value] || value || 'Gender'}
      </span>
    </ListItemLine>
  );
}

function GenderPick({
  value = '',
  onSave,
}: {
  value?: string;
  onSave: (selectedValue: string) => void;
}) {
  const [isCustomFieldOpen, setCustomFieldOpen] = React.useState(false);
  const optionIsSelected = (option: string) => option === value;

  return (
    <span className={styles.fieldOpen}>
      {!isCustomFieldOpen &&
        _getGenderOptions(value).map((option, index) => (
          <React.Fragment key={option}>
            <span
              className={clsx(
                styles.option,
                optionIsSelected(option) ? styles.optionSelected : undefined,
                index === 0
                  ? value
                    ? styles.fakeCaret
                    : styles.fakeCaretEmpty
                  : undefined
              )}
              onClick={(ev) => {
                ev.stopPropagation();
                onSave(option);
              }}
            >
              {VALUE_LABEL[option]}
            </span>
            <span className={fieldStyles.staticDisplay}>&#47;</span>
          </React.Fragment>
        ))}

      <CustomGenderInput
        key={value || 'field-custom-gender'}
        defaultValue={[MALE, FEMALE].includes(value) ? '' : value}
        onOpen={() => setCustomFieldOpen(true)}
        onSave={onSave}
      />
    </span>
  );
}

function CustomGenderInput({
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

export { FieldGender };
