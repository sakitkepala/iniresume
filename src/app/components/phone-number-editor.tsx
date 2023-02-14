import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from '../contexts/resume-editor';
import { useEditableLinesManager } from './line-editors';
import { useListItemEditorDisclosure } from './line-editors';

import * as lineStyles from './line-editors.css';
import * as styles from './phone-number-editor.css';

function PhoneNumberEditor() {
  const { resume, updateField } = useResumeEditor();
  const { resetActiveLine } = useEditableLinesManager();
  const { isOpen, close } = useListItemEditorDisclosure();
  const [shouldShowZeroNumberMessage, showZeroNumberMessage] =
    React.useState(false);
  const $input = React.useRef<HTMLInputElement>(null);
  const $checkbox = React.useRef<HTMLInputElement>(null);

  const value = resume?.phone;
  const [inputValue, setInputValue] = React.useState<string>(
    value?.number || ''
  );

  useHotkeys('esc', resetActiveLine, {
    enabled: isOpen,
    enableOnFormTags: true,
    preventDefault: true,
  });

  useHotkeys(
    'enter, tab',
    () => {
      if (close && updateField) {
        close();
        const phoneNumber = { number: '', wa: false };
        if ($input.current?.value) {
          phoneNumber.number = $input.current?.value;
          phoneNumber.wa = Boolean($checkbox.current?.checked);
        }
        updateField('phone', phoneNumber);
      }
    },
    {
      enabled: isOpen,
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  React.useEffect(() => {
    isOpen && $input.current?.focus();
  }, [isOpen]);

  React.useEffect(() => {
    // otomatis hilangkan message setelah muncul beberapa detik
    if (shouldShowZeroNumberMessage) {
      const timer = setTimeout(() => {
        showZeroNumberMessage(false);
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [shouldShowZeroNumberMessage]);

  if (isOpen) {
    return (
      <span className={styles.phoneEditorWrapper}>
        <span className={styles.staticEditorUIText}>+62</span>
        <span className={styles.staticEditorUIText}>-</span>
        <input
          ref={$input}
          className={styles.inputField}
          type="text"
          value={inputValue}
          onChange={(ev) => {
            const { value: fullValue } = ev.target;
            // hilangkan angka nol di depan nomor telpon
            const [first, ...numbers] = fullValue;
            if (first === '0') {
              showZeroNumberMessage(true);
            }
            const value = first === '0' ? numbers.join('') : fullValue;
            setInputValue(value);
          }}
        />
        {shouldShowZeroNumberMessage && <span>Tanpa angka "0" di depan</span>}
        {inputValue.length > 3 && (
          <>
            <input
              ref={$checkbox}
              id="wa"
              type="checkbox"
              defaultValue={value?.wa ? 'true' : 'false'}
              defaultChecked={value?.wa}
            />
            <label htmlFor="wa" className={styles.waOptionLabel}>
              Nomor WhatsApp?
            </label>
          </>
        )}
      </span>
    );
  }

  if (!value?.number) {
    return (
      <span className={lineStyles.editorPlaceholderLabel}>
        ...isi nomor telepon
      </span>
    );
  }

  return (
    <>
      <span className={lineStyles.editorValueLabel}>
        <span>+62</span>
        <span>{value.number}</span>
      </span>
      {Boolean(value?.wa) && (
        <>
          <span>&nbsp;</span>
          <span className={styles.staticDisplayUIText}>(WA Available)</span>
        </>
      )}
    </>
  );
}

export { PhoneNumberEditor };
