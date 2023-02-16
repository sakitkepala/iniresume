import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useResumeEditor } from 'src/app/contexts/resume-editor';

import {
  EditableLineWrapper,
  useEditableLineDisclosure,
} from '../components/editable-line';
import { ListItemLine } from './list-item-line';

import { type LineComponentProps } from '../components/line';

import { clsx } from 'clsx';

import * as fieldStyles from './common-styles.css';
import * as styles from './li-phone.css';

function LineListItemPhone({
  number,
  children,
  hasWA,
}: React.PropsWithChildren<LineComponentProps & { hasWA: boolean }>) {
  return (
    <EditableLineWrapper line={number}>
      <PhoneField hasWA={hasWA}>{children}</PhoneField>
    </EditableLineWrapper>
  );
}

function PhoneField({
  children,
  hasWA,
}: React.PropsWithChildren<{ hasWA: boolean }>) {
  const { isOpen } = useEditableLineDisclosure();
  const value = typeof children === 'string' ? children : '';

  if (isOpen) {
    return (
      <ListItemLine muted>
        <PhoneEditor initialValue={value} hasWA={hasWA} />
      </ListItemLine>
    );
  }

  if (!value) {
    return (
      <ListItemLine muted>
        <span className={fieldStyles.fieldEmptyLabel}>Nomor telepon</span>
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
}: {
  initialValue?: string;
  hasWA: boolean;
}) {
  const { updateField } = useResumeEditor();
  const { close } = useEditableLineDisclosure();
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const [shouldShowInlineMessage, showInlineMessage] = React.useState(false);
  const $input = React.useRef<HTMLInputElement>(null);
  const $checkbox = React.useRef<HTMLInputElement>(null);

  useHotkeys(
    'enter, tab',
    () => {
      close();
      const phoneNumber = { number: '', wa: false };
      if ($input.current?.value) {
        phoneNumber.number = $input.current?.value;
        phoneNumber.wa = Boolean($checkbox.current?.checked);
      }
      updateField('phone', phoneNumber);
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
      const timer = setTimeout(() => {
        showInlineMessage(false);
      }, 1500);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [shouldShowInlineMessage]);

  return (
    <span
      className={styles.phoneEditorWrapper}
      onClick={() => $input.current?.focus()}
    >
      <span className={fieldStyles.staticDisplay}>+62</span>
      <span>&nbsp;</span>
      <span className={fieldStyles.staticDisplay}>-</span>
      <span>&nbsp;</span>
      <input
        ref={$input}
        className={clsx(fieldStyles.inputText, styles.phoneInput)}
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
        }}
      />
      {inputValue.length > 3 && (
        <span
          className={styles.waField}
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
            className={clsx(fieldStyles.triggerText, styles.waFieldLabel)}
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

export { LineListItemPhone };
