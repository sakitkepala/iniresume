import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';
import { TextFieldInput } from './text-field-input';

import { clsx } from 'clsx';

import * as fieldStyle from './fields.css';
import * as styles from './field-list-item-project-description.css';

const PLACEHOLDER_LABEL = '// Cantumkan link projek *bila ada';

function FieldListItemProjectURL({
  experienceId,
  projectId,
  value = '',
}: {
  experienceId: string;
  projectId: string;
  value?: string;
}) {
  const { updateProject } = useResumeEditor();
  const { isActive, next } = useActiveLine();

  if (isActive) {
    return (
      <ListItemSubLine>
        <TextFieldInput
          placeholder={PLACEHOLDER_LABEL}
          initialValue={value || 'https://'}
          onSave={(urlValue) => {
            // Ngecek URL terisi atau enggak tanpa prefiks protokol http-nya
            // Biar gak tersimpan cuma string protokolnya doang wkwk
            // TODO: replace-nya pake regex aja kali ya?
            const isEmptyURL = ['https://', 'http://'].some((protocol) => {
              const urlWithoutProtocolPrefix = urlValue.replace(protocol, '');
              return !urlWithoutProtocolPrefix;
            });
            const value = isEmptyURL ? '' : urlValue;
            updateProject(experienceId, projectId, 'url', value);
            next();
          }}
        />
      </ListItemSubLine>
    );
  }

  if (!value) {
    return (
      <ListItemSubLine>
        <span className={fieldStyle.fieldEmptyLabel}>{PLACEHOLDER_LABEL}</span>
      </ListItemSubLine>
    );
  }

  return (
    <ListItemSubLine>
      <span>Link projek:</span>
      <span>&nbsp;</span>
      <span
        className={clsx(fieldStyle.fieldValueLabel, fieldStyle.linkTextLabel)}
      >
        {value}
      </span>
    </ListItemSubLine>
  );
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

export { FieldListItemProjectURL };
