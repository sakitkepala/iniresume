import * as React from 'react';

import { clsx } from 'clsx';

import * as fieldStyles from './fields.css';
import * as styles from './autogrowing-input.css';

export type AutogrowingInputProps = {
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
          tabIndex={-1}
          size={initialSize}
          spellCheck={false}
          className={clsx(fieldStyles.inputText, styles.input, inputClassName)}
          placeholder={placeholder}
          value={typeof value === 'undefined' ? inputValue : value}
          onChange={(ev) => {
            const { value: valueInput } = ev.target;
            typeof value === 'undefined' && setInputValue(valueInput);
            onChange?.(valueInput);
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
