import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useActiveLine } from '../contexts/active-line';

import { ListItemLine } from './list-item-line';
import { TextFieldInput } from './text-field-input';

import { type ResumeData } from 'src/app/data/resume';

import * as fieldStyles from './fields.css';

function FieldListItemText({
  value = '',
  field,
  label,
  placeholder,
}: {
  value?: string;
  label: string;
  placeholder?: string;
  field: keyof ResumeData;
}) {
  const { updateTextField } = useResumeEditor();
  const { isActive, next } = useActiveLine();

  if (isActive) {
    return (
      <ListItemLine muted>
        <TextFieldInput
          initialValue={value}
          placeholder={placeholder || `// ${label}`}
          onSave={(textValue) => {
            updateTextField(field, textValue);
            next();
          }}
        />
      </ListItemLine>
    );
  }

  return (
    <ListItemLine muted={!value}>
      <span
        aria-label={label}
        className={
          value ? fieldStyles.fieldValueLabel : fieldStyles.fieldEmptyLabel
        }
      >
        {value || placeholder || `// ${label}`}
      </span>
    </ListItemLine>
  );
}

export { FieldListItemText };
