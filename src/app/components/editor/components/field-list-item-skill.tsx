import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useLineContents } from '../contexts/line-contents';
import { useActiveLine } from '../contexts/active-line';

import { TriggerText } from './trigger-text';
import { ListItemLine } from './list-item-line';
import { AutogrowingInput } from './autogrowing-input';

import { v1 } from 'uuid';

import * as fieldStyles from './fields.css';
import * as styles from './field-list-item-skill.css';

const INPUT_PLACEHOLDER_TEXT = 'Punya skill apa?';

function FieldListItemAddSkill({
  asInsert,
  asInsertTop,
  insertBelow,
}: {
  asInsert?: boolean;
  asInsertTop?: boolean;
  insertBelow?: string;
}) {
  const { resume, addSkill, insertSkill, insertSkillTop } = useResumeEditor();
  const { isActive, activate, reset, shouldPromptDirty } = useActiveLine();
  const [resetId, setResetId] = React.useState(() => v1());
  const $input = React.useRef<null | { focus: () => void }>(null);

  if (isActive) {
    return (
      <ListItemLine muted>
        <div onClick={() => $input.current?.focus()}>
          <SkillTextInput
            ref={$input}
            key={resetId}
            placeholder={INPUT_PLACEHOLDER_TEXT}
            onDirty={() => shouldPromptDirty()}
            onClean={() => shouldPromptDirty(false)}
            onSave={(skill) => {
              if (asInsert) {
                insertBelow && insertSkill(insertBelow, skill);
                reset();
                return;
              }
              if (asInsertTop) {
                insertSkillTop(skill);
                reset();
                return;
              }
              addSkill(skill);
              setResetId(v1());
            }}
          />
        </div>
      </ListItemLine>
    );
  }

  if (!resume.skills.length || asInsert || asInsertTop) {
    return (
      <ListItemLine muted>
        <span className={fieldStyles.fieldEmptyLabel}>{'//'} Isi skill</span>
      </ListItemLine>
    );
  }

  return (
    <span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <TriggerText onClick={activate}>Tambah skill lagi</TriggerText>
    </span>
  );
}

function FieldListItemSkill({
  value = '',
  first,
  last,
}: {
  value?: string;
  first?: boolean;
  last?: boolean;
}) {
  const { resume, editSkill } = useResumeEditor();
  const { isActive, reset, shouldPromptDirty } = useActiveLine();
  const $input = React.useRef<null | { focus: () => void }>(null);

  if (isActive) {
    return (
      <ListItemLine muted containerClassName={styles.skillItem}>
        <div onClick={() => $input.current?.focus()}>
          <SkillTextInput
            ref={$input}
            initialValue={value}
            placeholder={INPUT_PLACEHOLDER_TEXT}
            onDirty={() => shouldPromptDirty()}
            onClean={() => shouldPromptDirty(false)}
            onSave={(skill) => {
              editSkill(skill, value);
              reset();
            }}
          />
          {!last && <InsertSkill toTop={first} insertBelow={value} />}
        </div>
      </ListItemLine>
    );
  }

  if (!resume.skills.length) {
    return (
      <ListItemLine muted>
        <span className={fieldStyles.fieldEmptyLabel}>{'//'} Isi skill</span>
      </ListItemLine>
    );
  }

  return (
    <ListItemLine containerClassName={styles.skillItem}>
      <span className={fieldStyles.fieldValueLabel}>{value}</span>
      {!last && <InsertSkill toTop={first} insertBelow={value} />}
    </ListItemLine>
  );
}

const SkillTextInput = React.forwardRef<
  { focus: () => void },
  {
    initialValue?: string;
    placeholder?: string;
    onDirty?: () => void;
    onClean?: () => void;
    onSave: (value: string) => void;
  }
>(({ initialValue = '', placeholder, onDirty, onClean, onSave }, $ref) => {
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const $input = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle($ref, () => ({
    focus: () => $input.current?.focus(),
  }));

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  useHotkeys('enter', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <AutogrowingInput
      ref={$input}
      placeholder={placeholder}
      initialSize={!inputValue ? placeholder?.length : undefined}
      value={inputValue}
      onChange={(value) => {
        setInputValue(value);
        const isDirty = value !== initialValue;
        isDirty && onDirty?.();
        !isDirty && onClean?.();
      }}
    />
  );
});

function InsertSkill({
  toTop,
  insertBelow,
}: {
  toTop?: boolean;
  insertBelow: string;
}) {
  const { insertSkillOnTop, insertSkillBelow } = useLineContents();
  return (
    <span className={styles.actions}>
      {toTop && (
        <TriggerText onClick={() => insertSkillOnTop(true)}>
          Tambah di atasnya
        </TriggerText>
      )}

      <TriggerText onClick={() => insertSkillBelow(insertBelow)}>
        Tambah di bawahnya
      </TriggerText>
    </span>
  );
}

export { FieldListItemAddSkill, FieldListItemSkill };
