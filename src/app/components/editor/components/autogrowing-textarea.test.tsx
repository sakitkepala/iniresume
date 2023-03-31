import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {
  AutogrowingTextarea,
  AutogrowingTextareaHandle,
} from './autogrowing-textarea';

function TestFocusTextareaUsingHandle() {
  const $input = React.useRef<AutogrowingTextareaHandle>(null);
  return (
    <>
      <AutogrowingTextarea ref={$input} />
      <button onClick={() => $input.current?.focus()}>fokus</button>
    </>
  );
}

describe('AutogrowingTextarea', () => {
  test('render default', () => {
    render(<AutogrowingTextarea />);
    const $textarea = screen.getByDisplayValue('');

    expect($textarea).toBeInTheDocument();
    expect($textarea).toHaveAttribute('rows', '1');
    expect($textarea).not.toHaveValue();
    expect($textarea).not.toHaveFocus();
  });

  test('render secara uncontrolled dengan initial value', async () => {
    const initialValue = 'initial';
    const editValue = 'edit';
    const handleChange = jest.fn();

    render(
      <AutogrowingTextarea
        initialValue={initialValue}
        onChange={handleChange}
      />
    );

    const $textarea = screen.getByDisplayValue(initialValue);

    expect($textarea).toBeInTheDocument();
    expect($textarea).toHaveValue(initialValue);

    await userEvent.clear($textarea);
    await userEvent.type($textarea, editValue);

    expect(handleChange).toHaveBeenCalledTimes(5); // clear 1x + 4x dari karakter "edit"
    expect(handleChange).toHaveBeenLastCalledWith(editValue);
    expect($textarea).toHaveValue(editValue);
  });

  test('render secara controlled', async () => {
    const controlledValue = 'value';
    const editValue = 'edit';
    const handleChange = jest.fn();

    render(
      <AutogrowingTextarea value={controlledValue} onChange={handleChange} />
    );

    const $textarea = screen.getByDisplayValue(controlledValue);

    expect($textarea).toBeInTheDocument();
    expect($textarea).toHaveValue(controlledValue);

    await userEvent.clear($textarea);
    await userEvent.type($textarea, editValue);

    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(handleChange).toHaveBeenNthCalledWith(1, '');
    expect(handleChange).toHaveBeenNthCalledWith(2, controlledValue + 'e');
    expect(handleChange).toHaveBeenNthCalledWith(3, controlledValue + 'd');
    expect(handleChange).toHaveBeenNthCalledWith(4, controlledValue + 'i');
    expect(handleChange).toHaveBeenNthCalledWith(5, controlledValue + 't');
    expect($textarea).toHaveValue(controlledValue);
  });

  test('render autofocus ketika di-mounted', () => {
    render(<AutogrowingTextarea autofocus />);

    expect(screen.getByDisplayValue('')).toHaveFocus();
  });

  test('akses focus dari handle ref', async () => {
    render(<TestFocusTextareaUsingHandle />);
    const $textarea = screen.getByDisplayValue('');

    expect($textarea).not.toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: /fokus/i }));

    expect($textarea).toHaveFocus();
  });
});
