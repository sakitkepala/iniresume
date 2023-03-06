import * as React from 'react';

import { clsx } from 'clsx';

import * as fieldStyles from './fields.css';
import * as styles from './autogrowing-input.css';

export type AutogrowingInputProps = {
  id?: string;
  autofocus?: boolean;
  initialSize?: number;
  initialValue?: string;
  placeholder?: string;
  value?: string;
  onChange?: (inputValue: string) => void;
  onFocus?: () => void;
  inputClassName?: string;
};

export type AutogrowingInputHandle = {
  focus: () => void;
};

const AutogrowingInput = React.forwardRef<
  AutogrowingInputHandle,
  AutogrowingInputProps
>(
  (
    {
      id,
      autofocus = false,
      initialSize = 1,
      initialValue = '',
      placeholder,
      value,
      onChange,
      onFocus,
      inputClassName,
    },
    $ref
  ) => {
    const $input = React.useRef<HTMLInputElement>(null);
    // support "uncontrolled" dari parent
    const [inputValue, setInputValue] = React.useState<string>(initialValue);

    React.useImperativeHandle($ref, () => ({
      focus: () => $input.current?.focus(),
    }));

    React.useEffect(() => {
      autofocus && $input.current?.focus();
    }, []);

    return (
      <span className={styles.autogrowingWrapper}>
        <input
          ref={$input}
          id={id}
          tabIndex={-1}
          size={initialSize}
          spellCheck={false}
          className={clsx(fieldStyles.inputText, styles.input, inputClassName)}
          placeholder={placeholder}
          value={typeof value === 'undefined' ? inputValue : value}
          onChange={(ev) => {
            typeof value === 'undefined' && setInputValue(ev.target.value);
            onChange?.(ev.target.value);
          }}
          onFocus={onFocus}
        />
        <span
          className={clsx(
            fieldStyles.inputText,
            styles.input,
            styles.autogrowingBase
          )}
        >
          {typeof value === 'undefined' ? inputValue : value}
        </span>
      </span>
    );
  }
);

export { AutogrowingInput };
