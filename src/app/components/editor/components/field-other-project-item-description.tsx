import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useLineContents } from '../contexts/line-contents';
import { useActiveLine } from '../contexts/active-line';

import { AutogrowingTextarea } from './autogrowing-textarea';

import * as fieldStyles from './fields.css';

const PLACEHOLDER_LABEL = '// Deskripsikan projek bila perlu *bisa dikosongi';

function FieldOtherProjectItemDescription({
  projectId,
  value = '',
}: {
  projectId: string;
  value?: string;
}) {
  const { updateOtherProjects } = useResumeEditor();
  const { isActive, activateAfterReset } = useActiveLine();

  if (isActive) {
    return (
      <FieldDescription
        initialValue={value}
        onSave={(desc) => {
          updateOtherProjects(projectId, 'description', desc);
          activateAfterReset(`${projectId}-other-projects-item-url`);
        }}
      />
    );
  }

  if (!value) {
    return (
      <span className={fieldStyles.fieldEmptyLabel}>{PLACEHOLDER_LABEL}</span>
    );
  }

  return <span>{value}</span>;
}

function FieldDescription({
  initialValue = '',
  onSave,
}: {
  initialValue?: string;
  onSave: (description: string) => void;
}) {
  const { preventHotkey } = useLineContents();
  const [inputValue, setInputValue] = React.useState<string>(initialValue);

  React.useEffect(() => {
    preventHotkey();
  }, []);

  useHotkeys('enter', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <AutogrowingTextarea
      autofocus
      placeholder={PLACEHOLDER_LABEL}
      value={inputValue}
      onChange={setInputValue}
    />
  );
}

export { FieldOtherProjectItemDescription };
