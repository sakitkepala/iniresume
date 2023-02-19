import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import { useRegisterEditable, useLineDisclosure } from '../components/line';
import { ListItemLine } from './list-item-line';

import * as fieldStyles from './common-styles.css';
import * as styles from './li-date-of-birth.css';

function LineListItemDateOfBirth({ children }: React.PropsWithChildren) {
  useRegisterEditable();
  const { updateTextField } = useResumeEditor();
  const { isOpen, close: closeEditor } = useLineDisclosure();
  const initialData = typeof children === 'string' ? children : '';

  if (isOpen) {
    return (
      <ListItemLine muted>
        <DateInput
          defaultValue={initialData}
          onSave={(value) => {
            updateTextField('birthdate', value);
            closeEditor();
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
        {initialData || 'Tanggal lahir (dipakai hitung usia)'}
      </span>
    </ListItemLine>
  );
}

function DateInput({
  defaultValue = '',
  onSave,
}: {
  defaultValue?: string;
  onSave: (data: string) => void;
}) {
  const [input, setInput] = React.useState(() =>
    _getValueFromData(defaultValue)
  );
  const { getInputProps, cycleField, focusLastInput } = useCycleInputs();

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
    setInput((input) => ({
      ...input,
      [name]: trimmedValue,
    }));
  };

  return (
    <span
      className={styles.inputWrapper}
      onClick={(ev) => {
        ev.stopPropagation();
        focusLastInput();
      }}
    >
      <input
        {...getInputProps('year')}
        type="text"
        className={styles.inputField}
        id="year"
        name="year"
        placeholder="19xx"
        value={input.year}
        onChange={(ev) => {
          updateInputValue('year', ev.target.value);
          cycleField('year', ev.target.value);
        }}
      />
      <span>&nbsp;</span>
      <span className={fieldStyles.staticDisplay}>-</span>
      <span>&nbsp;</span>
      <input
        {...getInputProps('month')}
        type="text"
        className={styles.inputField}
        id="month"
        name="month"
        placeholder="12"
        value={input.month}
        onChange={(ev) => {
          updateInputValue('month', ev.target.value);
          cycleField('month', ev.target.value);
        }}
      />
      <span>&nbsp;</span>
      <span className={fieldStyles.staticDisplay}>-</span>
      <span>&nbsp;</span>
      <input
        {...getInputProps('day')}
        type="text"
        className={styles.inputField}
        id="day"
        name="day"
        placeholder="01"
        value={input.day}
        onChange={(ev) => {
          updateInputValue('day', ev.target.value);
          cycleField('day', ev.target.value);
        }}
      />
    </span>
  );
}

function useCycleInputs({ enabled = true }: { enabled?: boolean } = {}) {
  const $inputs = React.useRef<Map<string, HTMLInputElement>>(new Map());
  const registerInput = (name: string, node: HTMLInputElement) => {
    $inputs.current.set(name, node);
  };
  const lastFocusIndex = React.useRef(0);

  const focusLastInput = () => {
    const $input = $inputs.current.get(
      ['year', 'month', 'day'][lastFocusIndex.current]
    );
    $input?.focus();
  };

  const getInputProps: (name: string) => {
    ref: React.LegacyRef<HTMLInputElement>;
    onFocus: React.FocusEventHandler<HTMLInputElement>;
  } = (name) => ({
    ref: (node) => node && registerInput(name, node),
    onFocus: (ev) => {
      const $inputList = [...$inputs.current.values()];
      const index = $inputList.findIndex(
        ($input) => $input === ev.currentTarget
      );
      lastFocusIndex.current = index;
    },
  });

  const getNextFocusIndex = () => {
    const nextIndex = lastFocusIndex.current + 1;
    if (nextIndex >= $inputs.current.size) {
      return 0;
    } else {
      return nextIndex;
    }
  };

  const getPrevFocusIndex = () => {
    const prevIndex = lastFocusIndex.current - 1;
    if (prevIndex < 0) {
      return $inputs.current.size - 1;
    } else {
      return prevIndex;
    }
  };

  const cycleField = (name: string, value: string) => {
    const digits = name === 'year' ? 4 : 2;
    if (value.length < digits) {
      return;
    }
    // Go to next field
    const $target = $inputs.current.get(name);
    if (!$target) {
      return;
    }
    const $inputList = [...$inputs.current.values()];
    const index = $inputList.findIndex(($input) => $input === $target);
    const nextIndex = index + 1;
    if (nextIndex >= $inputList.length) {
      return;
    }
    $inputList[nextIndex]?.select();
  };

  // Fokus waktu input di awal render
  React.useEffect(() => {
    if (enabled && $inputs.current.size === 3) {
      // Fokus ke field input yang masih kosong
      const sequence = [...$inputs.current.values()].map(
        ($input) => $input.value
      );
      for (let index = 0; index < $inputs.current.size; index++) {
        if (!sequence[index]) {
          const $element = [...$inputs.current.values()][index];
          $element?.select();
          return;
        }
      }
      // Fokus ke field tahun kalau isi semua
      const $year = [...$inputs.current.values()][0];
      $year?.select();
    }
  }, [enabled]);

  useHotkeys(
    'tab',
    () => {
      const position = getNextFocusIndex();
      const $input = $inputs.current.get(['year', 'month', 'day'][position]);
      $input?.select();
    },
    {
      enabled: enabled,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  useHotkeys(
    'shift+tab',
    () => {
      const position = getPrevFocusIndex();
      const $input = $inputs.current.get(['year', 'month', 'day'][position]);
      $input?.select();
    },
    {
      enabled: enabled,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  return { registerInput, cycleField, focusLastInput, getInputProps };
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

export { LineListItemDateOfBirth };
