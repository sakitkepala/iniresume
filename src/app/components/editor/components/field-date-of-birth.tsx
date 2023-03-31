import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';
import { useInputsCycle } from '../hooks/inputs-cycle';

import { useActiveLine } from '../contexts/active-line';
import { ListItemLine } from './list-item-line';

import { clsx } from 'clsx';

import * as fieldStyles from './fields.css';
import * as styles from './field-date-of-birth.css';

function FieldDateOfBirth({ value: initialData = '' }: { value?: string }) {
  const { updateTextField } = useResumeEditor();
  const { isActive, next, shouldPromptDirty } = useActiveLine();

  if (isActive) {
    return (
      <ListItemLine muted>
        <DateInput
          defaultValue={initialData}
          onDirty={() => shouldPromptDirty()}
          onClean={() => shouldPromptDirty(false)}
          onSave={(value) => {
            updateTextField('birthdate', value);
            next();
          }}
        />
      </ListItemLine>
    );
  }

  return (
    <ListItemLine muted={!initialData}>
      <span
        className={
          initialData
            ? fieldStyles.fieldValueLabel
            : fieldStyles.fieldEmptyLabel
        }
      >
        {initialData || '// Tanggal lahir (dipakai hitung usia)'}
      </span>
    </ListItemLine>
  );
}

function DateInput({
  defaultValue = '',
  onDirty,
  onClean,
  onSave,
}: {
  defaultValue?: string;
  onDirty?: () => void;
  onClean?: () => void;
  onSave: (data: string) => void;
}) {
  const [input, setInput] = React.useState(() =>
    _getValueFromData(defaultValue)
  );
  const { getCycleProps, focusLastInput } = useInputsCycle();

  useHotkeys(
    'enter',
    () => {
      const values = [input.year, input.month, input.day];
      const dataValue = values.some((part) => !part) ? '' : values.join('-');
      onSave(dataValue);
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  const updateInputValue = (name: string, value: string) => {
    // Nilai input dipenggal sedemikian rupa
    // supaya sesuai dengan jumlah digit angkanya
    const digits = name === 'year' ? 4 : 2;
    const trimmedValue = value.length > digits ? value.substring(1) : value;

    setInput((input) => {
      const stateValue = { ...input, [name]: trimmedValue };
      const stringValue = [stateValue.year, stateValue.month, stateValue.day]
        .filter((v) => Boolean(v))
        .join('-');

      const isDirty = stringValue !== defaultValue;
      isDirty && onDirty?.();
      !isDirty && onClean?.();

      return stateValue;
    });
  };

  return (
    <div
      data-testid="date-of-birth-line-container"
      className={styles.inputWrapper}
      onClick={(ev) => {
        ev.stopPropagation();
        focusLastInput();
      }}
    >
      <label htmlFor="birth-year" className={styles.label}>
        Tahun lahir
      </label>
      <input
        {...getCycleProps('year', {
          onChange: (ev) => updateInputValue('year', ev.target.value),
          autoSwitchWhen: (value) => value.length >= 4,
        })}
        type="text"
        className={clsx(styles.inputField, styles.inputFieldYear)}
        id="birth-year"
        name="year"
        placeholder="19xx"
        value={input.year}
      />

      <span>&nbsp;</span>
      <span className={fieldStyles.staticDisplay}>-</span>
      <span>&nbsp;</span>

      <label htmlFor="birth-month" className={styles.label}>
        Bulan lahir
      </label>
      <input
        {...getCycleProps('month', {
          onChange: (ev) => updateInputValue('month', ev.target.value),
          autoSwitchWhen: (value) => value.length >= 2,
        })}
        type="text"
        className={styles.inputField}
        id="birth-month"
        name="month"
        placeholder="12"
        value={input.month}
      />

      <span>&nbsp;</span>
      <span className={fieldStyles.staticDisplay}>-</span>
      <span>&nbsp;</span>

      <label htmlFor="birth-day" className={styles.label}>
        Tanggal lahir
      </label>
      <input
        {...getCycleProps('day', {
          onChange: (ev) => updateInputValue('day', ev.target.value),
          autoSwitchWhen: (value) => value.length >= 2,
        })}
        type="text"
        className={styles.inputField}
        id="birth-day"
        name="day"
        placeholder="01"
        value={input.day}
      />
    </div>
  );
}

function _getValueFromData(dateString: string) {
  const val = {
    year: '',
    month: '',
    day: '',
  };
  const parts = dateString.split('-');
  if (parts.length !== 3) {
    return val;
  }
  val.year = parts[0];
  val.month = parts[1];
  val.day = parts[2];
  return val;
}

export { FieldDateOfBirth, DateInput };
