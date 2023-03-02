import * as React from 'react';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';

import { FieldHeading } from './field-heading';

const PLACEHOLDER_LABEL = '// Nama/judul projek';

function FieldOtherProjectItemName({
  projectId,
  value = '',
}: {
  projectId: string;
  value?: string;
}) {
  const { updateOtherProjects } = useResumeEditor();
  const { activateAfterReset } = useActiveLine();

  return (
    <FieldHeading
      label={PLACEHOLDER_LABEL}
      initialValue={value}
      onSave={(name) => {
        updateOtherProjects(projectId, 'name', name);
        activateAfterReset(`${projectId}-other-projects-item-description`);
      }}
    />
  );
}

export { FieldOtherProjectItemName };
