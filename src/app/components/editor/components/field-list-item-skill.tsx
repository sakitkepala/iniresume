import * as React from 'react';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useLineContents } from '../contexts/line-contents';
import { useActiveLine } from '../contexts/active-line';

import { TriggerText } from './trigger-text';
import { ListItemLine } from './list-item-line';
import { PlainTextInput } from './field-list-item-text';

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
  const { isActive, activate, reset } = useActiveLine();
  const [resetId, setResetId] = React.useState(() => v1());

  if (isActive) {
    return (
      <ListItemLine muted>
        <PlainTextInput
          key={resetId}
          placeholder={INPUT_PLACEHOLDER_TEXT}
          onSave={(skill) => {
            if (asInsert && insertBelow) {
              insertSkill(insertBelow, skill);
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
      </ListItemLine>
    );
  }

  if (!resume.skills.length || asInsert) {
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
  const { isActive, reset } = useActiveLine();

  if (isActive) {
    return (
      <ListItemLine muted containerClassName={styles.skillItem}>
        <PlainTextInput
          initialValue={value}
          placeholder={INPUT_PLACEHOLDER_TEXT}
          onSave={(skill) => {
            editSkill(skill, value);
            reset();
          }}
        />
        {!last && <InsertSkill toTop={first} insertBelow={value} />}
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
