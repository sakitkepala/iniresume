import * as React from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { AutogrowingTextarea } from './autogrowing-textarea';

export type TextFieldInputHandle = {
  focus: () => void;
};

export type TextFieldInputProps = {
  initialValue?: string;
  placeholder?: string;
  onDirty?: () => void;
  onClean?: () => void;
  onSave: (inputValue: string) => void;
};

const TextFieldInput = React.forwardRef<
  TextFieldInputHandle,
  TextFieldInputProps
>(({ initialValue = '', placeholder, onDirty, onClean, onSave }, $ref) => {
  const [inputValue, setInputValue] = React.useState<string>(initialValue);
  const $input = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    $input.current?.focus();
  }, []);

  useHotkeys('enter', () => onSave(inputValue.trim()), {
    enableOnFormTags: true,
    preventDefault: true,
  });

  React.useImperativeHandle($ref, () => ({
    focus: () => $input.current?.focus(),
  }));

  return (
    <AutogrowingTextarea
      ref={$input}
      placeholder={placeholder}
      value={inputValue}
      onChange={(value) => {
        const isDirty = value !== initialValue;
        isDirty && onDirty?.();
        !isDirty && onClean?.();
        setInputValue(value);
      }}
    />
  );
});

export { TextFieldInput };
