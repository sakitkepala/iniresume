import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';

import { HeadingMarker } from './heading-marker';

import { clsx } from 'clsx';

import * as fieldStyles from './fields.css';
import * as styles from './field-heading.css';

function FieldExperienceTitle({
  value = '',
  label,
  experienceId,
}: {
  value?: string;
  label: string;
  experienceId: string;
}) {
  const { updateExperience } = useResumeEditor();
  const { activateAfterReset } = useActiveLine();
  return (
    <FieldHeading
      initialValue={value}
      label={label}
      onSave={(inputValue) => {
        updateExperience(experienceId || '', 'title', inputValue);
        activateAfterReset(`${experienceId}-experience-employer`);
      }}
    />
  );
}

function FieldExperienceEmployer({
  value = '',
  label,
  experienceId,
}: {
  value?: string;
  label: string;
  experienceId: string;
}) {
  const { updateExperience } = useResumeEditor();
  const { activateAfterReset } = useActiveLine();
  return (
    <FieldHeading
      sub
      initialValue={value}
      label={label}
      onSave={(inputValue) => {
        updateExperience(experienceId || '', 'employer', inputValue);
        activateAfterReset(`${experienceId}-experience-description`);
      }}
    />
  );
}

function FieldEducationSchool({
  value = '',
  label,
  educationId,
}: {
  value?: string;
  label: string;
  educationId: string;
}) {
  const { updateEducation } = useResumeEditor();
  const { activateAfterReset } = useActiveLine();
  return (
    <FieldHeading
      initialValue={value}
      label={label}
      onSave={(inputValue) => {
        updateEducation(educationId || '', 'school', inputValue);
        activateAfterReset(`${educationId}-education-major`);
      }}
    />
  );
}

function FieldEducationMajor({
  value = '',
  label,
  educationId,
}: {
  value?: string;
  label: string;
  educationId: string;
}) {
  const { updateEducation } = useResumeEditor();
  const { activateAfterReset } = useActiveLine();
  return (
    <FieldHeading
      sub
      initialValue={value}
      label={label}
      onSave={(inputValue) => {
        updateEducation(educationId || '', 'major', inputValue);
        activateAfterReset(`${educationId}-education-description`);
      }}
    />
  );
}

/* ============================= */

function FieldHeading({
  sub = false,
  initialValue,
  label,
  onSave,
}: {
  sub?: boolean;
  initialValue?: string;
  label: string;
  onSave: (inputValue: string) => void;
}) {
  const { isActive } = useActiveLine();

  if (isActive) {
    return (
      <HeadingMarker sub={sub}>
        <HeadingTextInput
          initialValue={initialValue}
          placeholder={label}
          onSave={onSave}
        />
      </HeadingMarker>
    );
  }

  return (
    <HeadingMarker sub={sub}>
      <span className={initialValue ? undefined : fieldStyles.fieldEmptyLabel}>
        {initialValue || label}
      </span>
    </HeadingMarker>
  );
}

function HeadingTextInput({
  initialValue = '',
  placeholder,
  onSave,
}: {
  initialValue?: string;
  placeholder?: string;
  onSave: (value: string) => void;
}) {
  const $input = React.useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = React.useState<string>(initialValue);

  useHotkeys('enter', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  return (
    <input
      ref={$input}
      type="text"
      className={clsx(fieldStyles.inputText, styles.text)}
      placeholder={placeholder}
      value={inputValue}
      onChange={(ev) => setInputValue(ev.target.value)}
    />
  );
}

export {
  FieldExperienceTitle,
  FieldExperienceEmployer,
  FieldEducationSchool,
  FieldEducationMajor,
};
