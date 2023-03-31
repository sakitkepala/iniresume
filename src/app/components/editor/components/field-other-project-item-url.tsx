import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';

import { AutogrowingInput } from './autogrowing-input';

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
  const { isActive, next, shouldPromptDirty } = useActiveLine();

  if (isActive) {
    return (
      <span>
        <span className={fieldStyle.staticDisplay}>Link projek: </span>
        <URLInput
          placeholder={PLACEHOLDER_LABEL}
          initialValue={value || 'https://'}
          onDirty={() => shouldPromptDirty()}
          onClean={() => shouldPromptDirty(false)}
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

function URLInput({
  initialValue = '',
  placeholder,
  onDirty,
  onClean,
  onSave,
}: {
  initialValue?: string;
  placeholder?: string;
  onDirty?: () => void;
  onClean?: () => void;
  onSave: (value: string) => void;
}) {
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const $input = React.useRef<HTMLInputElement>(null);

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
      value={inputValue}
      onChange={(value) => {
        setInputValue(value);
        const isDirty = value !== initialValue;
        isDirty && onDirty?.();
        !isDirty && onClean?.();
      }}
    />
  );
}

export { FieldOtherProjectItemURL };
