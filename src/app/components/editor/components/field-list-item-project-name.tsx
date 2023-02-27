import * as React from 'react';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';

import { ListItemLine } from './list-item-line';
import { PlainTextInput } from './field-list-item-text';

import * as fieldStyles from './fields.css';
import * as styles from './field-list-item-project-name.css';

const PLACEHOLDER_LABEL = '// Nama/judul projek';

function FieldListItemProjectName({
  experienceId,
  projectId,
  value = '',
}: {
  experienceId: string;
  projectId: string;
  value?: string;
}) {
  const { updateProject } = useResumeEditor();
  const { isActive, activateAfterReset } = useActiveLine();
  const $input = React.useRef<{ focus: () => void } | null>(null);

  if (isActive) {
    return (
      <ListItemLine muted>
        <span
          className={styles.headline}
          onClick={(ev) => {
            ev.stopPropagation();
            $input.current?.focus();
          }}
        >
          <PlainTextInput
            ref={$input}
            placeholder={PLACEHOLDER_LABEL}
            initialValue={value}
            onSave={(projectName) => {
              updateProject(experienceId, projectId, 'name', projectName);
              activateAfterReset(`${projectId}-project-item-description`);
            }}
          />
        </span>
      </ListItemLine>
    );
  }

  if (!value) {
    return (
      <ListItemLine muted>
        <span className={styles.headline}>
          <span className={fieldStyles.fieldEmptyLabel}>
            {PLACEHOLDER_LABEL}
          </span>
        </span>
      </ListItemLine>
    );
  }

  return (
    <ListItemLine>
      <span className={styles.headline}>
        <span className={fieldStyles.fieldValueLabel}>{value}</span>
      </span>
    </ListItemLine>
  );
}

export { FieldListItemProjectName };
