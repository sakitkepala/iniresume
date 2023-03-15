import * as React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { AutogrowingInput, AutogrowingInputHandle } from './autogrowing-input';

function TestFocusInputUsingHandle() {
  const $input = React.useRef<AutogrowingInputHandle>(null);
  return (
    <>
      <AutogrowingInput ref={$input} />
      <button onClick={() => $input.current?.focus()}>fokus</button>
    </>
  );
}

describe('AutogrowingInput', () => {
  test('render default', () => {
    render(<AutogrowingInput />);
    const $input = screen.getByDisplayValue('');

    expect($input).toBeInTheDocument();
    expect($input).toHaveAttribute('size', '1');
    expect($input).not.toHaveValue();
    expect($input).not.toHaveFocus();
  });

  test('render secara uncontrolled dengan initial value', async () => {
    const initialValue = 'initial';
    const editValue = 'edit';
    const handleChange = jest.fn();

    render(
      <AutogrowingInput initialValue={initialValue} onChange={handleChange} />
    );

    const $input = screen.getByDisplayValue(initialValue);

    expect($input).toBeInTheDocument();
    expect($input).toHaveValue(initialValue);

    await userEvent.clear($input);
    await userEvent.type($input, editValue);

    expect(handleChange).toHaveBeenCalledTimes(5); // clear 1x + 4x dari karakter "edit"
    expect(handleChange).toHaveBeenLastCalledWith(editValue);
    expect($input).toHaveValue(editValue);
  });

  test('render secara controlled', async () => {
    const controlledValue = 'value';
    const editValue = 'edit';
    const handleChange = jest.fn();

    render(
      <AutogrowingInput value={controlledValue} onChange={handleChange} />
    );

    const $input = screen.getByDisplayValue(controlledValue);

    expect($input).toBeInTheDocument();
    expect($input).toHaveValue(controlledValue);

    await userEvent.clear($input);
    await userEvent.type($input, editValue);

    expect(handleChange).toHaveBeenCalledTimes(5);
    expect(handleChange).toHaveBeenNthCalledWith(1, '');
    expect(handleChange).toHaveBeenNthCalledWith(2, controlledValue + 'e');
    expect(handleChange).toHaveBeenNthCalledWith(3, controlledValue + 'd');
    expect(handleChange).toHaveBeenNthCalledWith(4, controlledValue + 'i');
    expect(handleChange).toHaveBeenNthCalledWith(5, controlledValue + 't');
    expect($input).toHaveValue(controlledValue);
  });

  test('render size sesuai prop initial size', () => {
    render(<AutogrowingInput initialSize={10} />);

    expect(screen.getByDisplayValue('')).toHaveAttribute('size', '10');
  });

  test('render autofocus ketika di-mounted', () => {
    render(<AutogrowingInput autofocus />);

    expect(screen.getByDisplayValue('')).toHaveFocus();
  });

  test('akses focus dari handle ref', async () => {
    render(<TestFocusInputUsingHandle />);
    const $input = screen.getByDisplayValue('');

    expect($input).not.toHaveFocus();

    await userEvent.click(screen.getByRole('button', { name: /fokus/i }));

    expect($input).toHaveFocus();
  });
});
