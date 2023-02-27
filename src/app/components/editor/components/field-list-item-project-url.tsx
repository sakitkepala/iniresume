import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';
import { PlainTextInput } from './field-list-item-text';

import { clsx } from 'clsx';

import * as fieldStyle from './fields.css';

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
      <span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <PlainTextInput
          placeholder={PLACEHOLDER_LABEL}
          initialValue={value || 'https://'}
          onSave={(url) => {
            // Ngecek URL terisi atau enggak tanpa prefiks protokol http-nya
            // Biar gak tersimpan cuma string protokolnya doang wkwk
            const isFilled = ['https://', 'http://'].every((protocol) =>
              Boolean(url.replace(protocol, ''))
            );
            updateProject(experienceId, projectId, 'url', isFilled ? url : '');
            next();
          }}
        />
      </span>
    );
  }

  if (!value) {
    return (
      <span>
        <span>&nbsp;</span>
        <span>&nbsp;</span>
        <span className={fieldStyle.fieldEmptyLabel}>{PLACEHOLDER_LABEL}</span>
      </span>
    );
  }

  return (
    <span>
      <span>&nbsp;</span>
      <span>&nbsp;</span>
      <span>Link projek:</span>
      <span>&nbsp;</span>
      <span
        className={clsx(fieldStyle.fieldValueLabel, fieldStyle.linkTextLabel)}
      >
        {value}
      </span>
    </span>
  );
}

export { FieldListItemProjectURL };
