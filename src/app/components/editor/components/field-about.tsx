import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useLineContents } from '../contexts/line-contents';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';

import { AutogrowingTextarea } from './autogrowing-textarea';

import * as fieldStyles from './fields.css';

const PLACEHOLDER_LABEL =
  '// Deskripsikan singkat tentang diri atau sasaran karir kamu';

function FieldAbout({ value = '' }: { value?: string }) {
  const { updateTextField } = useResumeEditor();
  const { isActive, next } = useActiveLine();

  if (isActive) {
    return (
      <AboutTextInput
        initialValue={value}
        placeholder={PLACEHOLDER_LABEL}
        onSave={(desc) => {
          updateTextField('about', desc);
          next();
        }}
      />
    );
  }

  if (!value) {
    return (
      <div aria-label="Field about">
        <span className={fieldStyles.fieldEmptyLabel}>{PLACEHOLDER_LABEL}</span>
      </div>
    );
  }

  return <div aria-label="Field about">{value}</div>;
}

function AboutTextInput({
  initialValue = '',
  placeholder,
  onSave,
}: {
  initialValue?: string;
  placeholder?: string;
  onSave: (description: string) => void;
}) {
  const { preventHotkey } = useLineContents();
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const isClean = initialValue === inputValue;

  useHotkeys('enter', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  return (
    <AutogrowingTextarea
      autofocus
      initialValue={initialValue}
      placeholder={placeholder}
      onChange={(value) => {
        // begitu dirty langsung dibuat gak bisa pindah-pindah line pakai hotkeynya
        !isClean && preventHotkey();
        setInputValue(value);
      }}
    />
  );
}

export { FieldAbout };
