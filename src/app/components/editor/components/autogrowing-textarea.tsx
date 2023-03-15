import * as React from 'react';
import { clsx } from 'clsx';
import * as styles from './autogrowing-textarea.css';

export type AutogrowingTextareaProps = {
  autofocus?: boolean;
  initialValue?: string;
  placeholder?: string;
  value?: string;
  onChange?: (inputValue: string) => void;
  onFocus?: () => void;
  textareaClassName?: string;
};

export type AutogrowingTextareaHandle = {
  focus: () => void;
};

const AutogrowingTextarea = React.forwardRef<
  AutogrowingTextareaHandle,
  AutogrowingTextareaProps
>(
  (
    {
      autofocus = false,
      initialValue = '',
      placeholder,
      value,
      onChange,
      onFocus,
      textareaClassName,
    },
    $ref
  ) => {
    const $textarea = React.useRef<HTMLTextAreaElement>(null);
    const [inputValue, setInputValue] = React.useState<string>(initialValue);

    React.useImperativeHandle($ref, () => ({
      focus: () => $textarea.current?.focus(),
    }));

    React.useEffect(() => {
      autofocus && $textarea.current?.focus();
    }, []);

    return (
      <div className={styles.autogrowingWrapper}>
        <textarea
          ref={$textarea}
          rows={1}
          className={clsx(styles.textarea, textareaClassName)}
          placeholder={placeholder}
          value={typeof value === 'undefined' ? inputValue : value}
          onChange={(ev) => {
            typeof value === 'undefined' && setInputValue(ev.target.value);
            onChange?.(ev.target.value);
          }}
          onFocus={onFocus}
        />
        <div
          aria-hidden
          className={clsx(styles.textarea, styles.autogrowingBase)}
        >
          {typeof value === 'undefined' ? inputValue : value}
        </div>
      </div>
    );
  }
);

export { AutogrowingTextarea };
