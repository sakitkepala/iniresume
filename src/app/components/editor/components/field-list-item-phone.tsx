import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import {
  type PhoneNumber,
  useResumeEditor,
} from 'src/app/contexts/resume-editor';

import { useActiveLine } from '../contexts/active-line';
import { ListItemLine } from './list-item-line';

import { clsx } from 'clsx';

import * as fieldStyles from './fields.css';
import * as styles from './field-list-item-phone.css';

function FieldListItemPhone({
  value = '',
  hasWA,
}: {
  value?: string;
  hasWA: boolean;
}) {
  const { updatePhone } = useResumeEditor();
  const { isActive, next, shouldPromptDirty } = useActiveLine();

  if (isActive) {
    return (
      <ListItemLine muted>
        <PhoneEditor
          initialValue={value}
          hasWA={hasWA}
          onDirty={() => shouldPromptDirty()}
          onClean={() => shouldPromptDirty(false)}
          onSave={(phone) => {
            updatePhone(phone);
            next();
          }}
        />
      </ListItemLine>
    );
  }

  if (!value) {
    return (
      <ListItemLine muted>
        <span className={fieldStyles.fieldEmptyLabel}>
          {'//'} Nomor telepon
        </span>
      </ListItemLine>
    );
  }

  return (
    <ListItemLine>
      <>
        <span className={fieldStyles.fieldValueLabel}>
          <span>+62</span>
          <span>{value}</span>
        </span>
        {hasWA && (
          <>
            <span>&nbsp;</span>
            <span className={fieldStyles.staticDisplay}>(WA Available)</span>
          </>
        )}
      </>
    </ListItemLine>
  );
}

function PhoneEditor({
  initialValue = '',
  hasWA,
  onDirty,
  onClean,
  onSave,
}: {
  initialValue?: string;
  hasWA: boolean;
  onDirty?: () => void;
  onClean?: () => void;
  onSave: (phone: PhoneNumber) => void;
}) {
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const [shouldShowInlineMessage, showInlineMessage] = React.useState(false);
  const $input = React.useRef<HTMLInputElement>(null);
  const $checkbox = React.useRef<HTMLInputElement>(null);

  useHotkeys(
    'enter',
    () => {
      const phoneNumber: PhoneNumber = { number: '', wa: false };
      if ($input.current?.value) {
        phoneNumber.number = $input.current?.value;
        phoneNumber.wa = Boolean($checkbox.current?.checked);
      }
      onSave(phoneNumber);
    },
    {
      enableOnFormTags: true,
      preventDefault: true,
    }
  );

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  React.useEffect(() => {
    // otomatis hilangkan message setelah muncul beberapa detik
    if (shouldShowInlineMessage) {
      const timer = setTimeout(() => showInlineMessage(false), 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [shouldShowInlineMessage]);

  return (
    <span
      className={styles.phoneEditor}
      onClick={() => $input.current?.focus()}
    >
      <span className={fieldStyles.staticDisplay}>+62</span>
      <span>&nbsp;</span>
      <span className={fieldStyles.staticDisplay}>-</span>
      <span>&nbsp;</span>
      <label htmlFor="phone-number" className={styles.phoneInputLabel}>
        Nomor telepon
      </label>
      <input
        ref={$input}
        className={clsx(fieldStyles.inputText, styles.phoneInput)}
        id="phone-number"
        type="text"
        value={inputValue}
        onChange={(ev) => {
          const { value: fullPhoneValue } = ev.target;
          // hilangkan angka nol di depan nomor telpon
          const [first, ...numbers] = fullPhoneValue;
          if (first === '0') {
            showInlineMessage(true);
          }
          const value = first === '0' ? numbers.join('') : fullPhoneValue;
          setInputValue(value);
          const isDirty = value !== initialValue;
          isDirty && onDirty?.();
          !isDirty && onClean?.();
        }}
      />

      {inputValue.length > 0 && (
        <span
          className={styles.fieldWA}
          onClick={() => $input.current?.focus()}
        >
          <input
            ref={$checkbox}
            id="wa"
            type="checkbox"
            defaultValue={hasWA ? 'true' : 'false'}
            defaultChecked={hasWA}
          />
          <label
            htmlFor="wa"
            className={clsx(styles.triggerText, styles.fieldWALabel)}
          >
            Nomor WhatsApp?
          </label>
        </span>
      )}

      {shouldShowInlineMessage && (
        <span className={styles.inlineMessage}>Tanpa angka "0" di depan</span>
      )}
    </span>
  );
}

export { FieldListItemPhone };
