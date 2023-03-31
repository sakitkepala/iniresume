import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useLineContents } from '../contexts/line-contents';
import { useActiveLine } from '../contexts/active-line';

import { AutogrowingTextarea } from './autogrowing-textarea';

import * as fieldStyles from './fields.css';
import * as styles from './field-list-item-project-description.css';

const PLACEHOLDER_LABEL = '// Deskripsikan projek bila perlu *bisa dikosongi';

function FieldListItemProjectDescription({
  experienceId,
  projectId,
  value = '',
}: {
  experienceId: string;
  projectId: string;
  value?: string;
}) {
  const { updateProject } = useResumeEditor();
  const { isActive, activateAfterReset, shouldPromptDirty } = useActiveLine();

  if (isActive) {
    return (
      <ListItemSubLine>
        <FieldDescription
          initialValue={value}
          onDirty={() => shouldPromptDirty()}
          onClean={() => shouldPromptDirty(false)}
          onSave={(desc) => {
            updateProject(experienceId, projectId, 'description', desc);
            activateAfterReset(`${projectId}-project-item-url`);
          }}
        />
      </ListItemSubLine>
    );
  }

  if (!value) {
    return (
      <ListItemSubLine>
        <span className={fieldStyles.fieldEmptyLabel}>{PLACEHOLDER_LABEL}</span>
      </ListItemSubLine>
    );
  }

  return <ListItemSubLine>{value}</ListItemSubLine>;
}

function ListItemSubLine({ children }: React.PropsWithChildren) {
  return (
    <div className={styles.subLine}>
      <div>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
      </div>

      <div className={styles.subLineContent}>{children}</div>
    </div>
  );
}

function FieldDescription({
  initialValue = '',
  onDirty,
  onClean,
  onSave,
}: {
  initialValue?: string;
  onDirty?: () => void;
  onClean?: () => void;
  onSave: (description: string) => void;
}) {
  const { preventHotkey } = useLineContents();
  const [inputValue, setInputValue] = React.useState<string>(initialValue);

  useHotkeys('enter', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <AutogrowingTextarea
      autofocus
      placeholder={PLACEHOLDER_LABEL}
      value={inputValue}
      onChange={(value) => {
        const isDirty = value !== initialValue;
        isDirty && onDirty?.();
        !isDirty && onClean?.();
        // begitu dirty langsung dibuat gak bisa pindah-pindah line pakai hotkeynya
        isDirty && preventHotkey();
        setInputValue(value);
      }}
    />
  );
}

export { FieldListItemProjectDescription };
