import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor, ResumeData } from '../contexts/resume-editor';
import {
  useEditableLinesManager,
  useListItemEditorDisclosure,
} from './line-editors';
import * as lineStyles from './line-editors.css';
import * as styles from './date-of-birth-editor.css';

function DateOfBirthEditor() {
  const { resume, updateTextField } = useResumeEditor();
  const { resetActiveLine, focusNext } = useEditableLinesManager();
  const { isOpen, open, close } = useListItemEditorDisclosure();
  const {
    __originalValue: value,
    sequence,
    ...date
  } = _getValueFromData(resume);

  const $inputs = React.useRef<Map<string, HTMLInputElement>>(new Map());
  const registerInput = (name: string, node: HTMLInputElement) => {
    $inputs.current.set(name, node);
  };
  const lastFocusIndex = React.useRef(0);

  const focusAndSelect = (node: HTMLInputElement) => {
    node.select();
    const $inputList = [...$inputs.current.values()];
    const index = $inputList.findIndex(($input) => $input === node);
    lastFocusIndex.current = index;
  };

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
    if (!$inputs.current.has(name)) {
      return;
    }
    const $target = $inputs.current.get(name);
    const digits = name === 'year' ? 4 : 2;
    if (value.length !== digits) {
      return;
    }
    // Go to next field
    const $inputList = [...$inputs.current.values()];
    const index = $inputList.findIndex(($input) => $input === $target);
    const nextIndex = index + 1;
    if (nextIndex >= $inputList.length) {
      return;
    }
    focusAndSelect($inputList[nextIndex]);
  };

  React.useEffect(() => {
    if (isOpen && $inputs.current.size === 3) {
      // Fokus ke field input yang masih kosong
      for (let index = 0; index < $inputs.current.size; index++) {
        if (!sequence[index]) {
          const $element = [...$inputs.current.values()][index];
          focusAndSelect($element);
          return;
        }
      }
      // Fokus ke field tahun kalau isi semua
      const $year = [...$inputs.current.values()][0];
      focusAndSelect($year);
    }
  }, [isOpen, sequence]);

  useHotkeys('esc', () => resetActiveLine?.(), {
    enabled: isOpen,
    enableOnFormTags: true,
  });

  useHotkeys(
    'tab',
    () => {
      const position = getNextFocusIndex();
      const $input = $inputs.current.get(['year', 'month', 'day'][position]);
      $input && focusAndSelect($input);
    },
    {
      enabled: isOpen,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  useHotkeys(
    'shift+tab',
    () => {
      const position = getPrevFocusIndex();
      const $input = $inputs.current.get(['year', 'month', 'day'][position]);
      $input && focusAndSelect($input);
    },
    {
      enabled: isOpen,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  useHotkeys(
    'enter',
    () => {
      const values: string[] = [];
      $inputs.current.forEach(($input) => {
        values.push($input.value);
      });
      const value = values.some((part) => !part) ? '' : values.join('-');
      updateTextField?.('birthdate', value);
      focusNext?.();
    },
    {
      enabled: isOpen,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  if (isOpen) {
    return (
      <span
        className={styles.dateFieldsWrapper}
        onClick={(ev) => {
          ev.preventDefault();
          close?.();
        }}
      >
        <input
          ref={(node) => node && registerInput('year', node)}
          type="text"
          className={styles.inputField}
          id="year"
          name="year"
          placeholder="19xx"
          defaultValue={date.year}
          onChange={(ev) => cycleField('year', ev.target.value)}
        />
        <span>-</span>
        <input
          ref={(node) => node && registerInput('month', node)}
          type="text"
          className={styles.inputField}
          id="month"
          name="month"
          placeholder="12"
          defaultValue={date.month}
          onChange={(ev) => cycleField('month', ev.target.value)}
        />
        <span>-</span>
        <input
          ref={(node) => node && registerInput('day', node)}
          type="text"
          className={styles.inputField}
          id="day"
          name="day"
          placeholder="01"
          defaultValue={date.day}
          onChange={(ev) => cycleField('day', ev.target.value)}
        />
      </span>
    );
  }

  const labelStyle = value
    ? lineStyles.editorValueLabel
    : lineStyles.editorPlaceholderLabel;

  return (
    <span className={labelStyle} onClick={open}>
      {value || '...isi tanggal lahir'}
    </span>
  );
}

function _getValueFromData(resume?: ResumeData) {
  const data = resume?.birthdate;
  const value = typeof data === 'string' ? data : '';
  const val = {
    __originalValue: value,
    sequence: [] as string[],
    year: '',
    month: '',
    day: '',
  };
  if (!data) {
    return val;
  }
  const parts = value.split('-');
  val.sequence = parts;
  if (parts.length !== 3) {
    return val;
  }
  val.year = parts[0];
  val.month = parts[1];
  val.day = parts[2];
  return val;
}

export { DateOfBirthEditor };
