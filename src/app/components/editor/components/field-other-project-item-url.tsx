import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';
import { PlainTextInput } from './field-list-item-text';

import { clsx } from 'clsx';

import * as fieldStyle from './fields.css';

const PLACEHOLDER_LABEL = '// Cantumkan link projek *bila ada';

function FieldOtherProjectItemURL({
  projectId,
  value = '',
}: {
  projectId: string;
  value?: string;
}) {
  const { updateOtherProjects } = useResumeEditor();
  const { isActive, next } = useActiveLine();

  if (isActive) {
    return (
      <span>
        <span className={fieldStyle.staticDisplay}>Link projek: </span>
        <PlainTextInput
          placeholder={PLACEHOLDER_LABEL}
          initialValue={value || 'https://'}
          onSave={(url) => {
            // Ngecek URL terisi atau enggak tanpa prefiks protokol http-nya
            // Biar gak tersimpan cuma string protokolnya doang wkwk
            const isFilled = ['https://', 'http://'].every((protocol) =>
              Boolean(url.replace(protocol, ''))
            );
            updateOtherProjects(projectId, 'url', isFilled ? url : '');
            next();
          }}
        />
      </span>
    );
  }

  if (!value) {
    return (
      <span className={fieldStyle.fieldEmptyLabel}>{PLACEHOLDER_LABEL}</span>
    );
  }

  return (
    <span>
      <span>Link projek: </span>
      <span
        className={clsx(fieldStyle.fieldValueLabel, fieldStyle.linkTextLabel)}
      >
        {value}
      </span>
    </span>
  );
}

export { FieldOtherProjectItemURL };
