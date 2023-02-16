import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useEditableLinesManager } from '../contexts/editable-lines-manager';
import { useTemporaryInsertLine } from '../contexts/temporary-insert-line';
import { useEditableLineDisclosure } from '../components/editable-line';

import { EditableLineWrapper } from '../components/editable-line';
import { TriggerText } from '../fields/trigger-text';

import { type TemporaryInsertLine } from '../contexts/temporary-insert-line';
import { type LineComponentProps } from '../components/line';

import { v4 } from 'uuid';
import { clsx } from 'clsx';

import * as fieldStyles from './common-styles.css';

const PLACEHOLDER_LABEL_TEXT = 'Nama skillnya';

function LineListItemSkill({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  return (
    <EditableLineWrapper line={number}>
      <EditSkillField number={number}>{children}</EditSkillField>
    </EditableLineWrapper>
  );
}

function EditSkillField({
  children,
  number,
}: React.PropsWithChildren<LineComponentProps>) {
  const { editSkill, resume } = useResumeEditor();
  const { hasActiveLine } = useEditableLinesManager();
  const { isOpen, close } = useEditableLineDisclosure();
  const $input = React.useRef<HTMLInputElement>(null);

  const value = typeof children === 'string' ? children : '';
  const lastSkillItem = resume.skills[resume.skills.length - 1];

  useHotkeys(
    'enter, tab',
    () => {
      const inputValue = $input.current?.value || '';
      editSkill(inputValue, value);
      inputValue && close();
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
      <span
        className={clsx(
          fieldStyles.listItemWrapper,
          fieldStyles.listItemSkillWrapper
        )}
      >
        <span>-</span>
        <span>&nbsp;</span>
        <input
          ref={$input}
          type="text"
          className={fieldStyles.inputText}
          placeholder={PLACEHOLDER_LABEL_TEXT}
          defaultValue={value}
        />
      </span>
    );
  }

  return (
    <span
      className={clsx(
        fieldStyles.listItemWrapper,
        fieldStyles.listItemSkillWrapper
      )}
    >
      <span>-</span>
      <span>&nbsp;</span>
      <span className={fieldStyles.fieldValueLabel}>
        {value || PLACEHOLDER_LABEL_TEXT}
      </span>
      {Boolean(value) && !hasActiveLine && value !== lastSkillItem && (
        <InsertSkill
          // Kebetulan nomor line sama target indeks nilainya sama wkwk
          insertLineAtIndex={number ? Number(number) : undefined}
          insertAfterSkill={value}
        />
      )}
    </span>
  );
}

function LineAddSkill({ number }: LineComponentProps) {
  return (
    <EditableLineWrapper line={number}>
      <AddSkillField />
    </EditableLineWrapper>
  );
}

function AddSkillField() {
  const { addSkill, resume } = useResumeEditor();
  const { isOpen, open, close } = useEditableLineDisclosure();
  const $input = React.useRef<HTMLInputElement>(null);
  const hasAnySkills = resume.skills.length > 0;

  useHotkeys(
    'enter, tab',
    () => {
      close();
      const value: string = $input.current?.value || '';
      Boolean(value) && addSkill(value);
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
      <span className={fieldStyles.listItemWrapper}>
        <span>-</span>
        <span>&nbsp;</span>
        <input
          ref={$input}
          className={fieldStyles.inputText}
          type="text"
          placeholder={PLACEHOLDER_LABEL_TEXT}
        />
      </span>
    );
  }

  if (hasAnySkills) {
    return (
      <span className={fieldStyles.listItemWrapper}>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span>
          <TriggerText onClick={open}>Tambah skill</TriggerText>
        </span>
      </span>
    );
  }

  return (
    <span className={fieldStyles.listItemWrapper}>
      <span>-</span>
      <span>&nbsp;</span>
      <span className={fieldStyles.fieldEmptyLabel}>Isi skill</span>
    </span>
  );
}

function InsertSkill({
  insertLineAtIndex,
  insertAfterSkill,
}: {
  insertLineAtIndex?: number;
  insertAfterSkill: string;
}) {
  const { insertedLines, insertLines } = useTemporaryInsertLine();
  const { activateLine } = useEditableLinesManager();

  if (typeof insertLineAtIndex === 'undefined' || insertedLines) {
    return null;
  }

  return (
    <span className={clsx(fieldStyles.skillInsertBelowWrapper)}>
      <TriggerText
        onClick={() => {
          const line: TemporaryInsertLine = {
            index: insertLineAtIndex,
            line: {
              id: v4(),
              element: (
                <LineListItemInsertSkill insertAfterSkill={insertAfterSkill} />
              ),
            },
          };
          insertLines([line]);
          activateLine(insertLineAtIndex + 1);
        }}
      >
        Tambah di bawahnya
      </TriggerText>
    </span>
  );
}

function LineListItemInsertSkill({
  number,
  insertAfterSkill,
}: LineComponentProps & { insertAfterSkill: string }) {
  return (
    <EditableLineWrapper line={number}>
      <InsertSkillField insertAfterSkill={insertAfterSkill} />
    </EditableLineWrapper>
  );
}

function InsertSkillField({ insertAfterSkill }: { insertAfterSkill: string }) {
  const { insertSkill } = useResumeEditor();
  const { discardLines } = useTemporaryInsertLine();
  const { resetActiveLine } = useEditableLinesManager();
  const { isOpen } = useEditableLineDisclosure();
  const $input = React.useRef<HTMLInputElement>(null);

  useHotkeys(
    'esc',
    () => {
      discardLines();
      resetActiveLine();
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  useHotkeys(
    'enter, tab',
    () => {
      const inputValue = $input.current?.value || '';
      if (inputValue) {
        insertSkill(insertAfterSkill, inputValue);
      }
      discardLines();
      resetActiveLine();
    },
    {
      enabled: isOpen,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  return (
    <span className={fieldStyles.listItemWrapper}>
      <span>-</span>
      <span>&nbsp;</span>
      <input
        ref={$input}
        className={fieldStyles.inputText}
        type="text"
        placeholder={PLACEHOLDER_LABEL_TEXT}
      />
    </span>
  );
}

export { LineListItemSkill, LineAddSkill };
