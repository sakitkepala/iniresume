import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TextFieldInput } from './text-field-input';

describe('TextFieldInput', () => {
  test('render dengan otomatis fokus ke input', () => {
    const handleSave = jest.fn();
    render(<TextFieldInput onSave={handleSave} />);

    expect(screen.getByDisplayValue('')).toHaveFocus();
  });

  test('handle save ketika di-Enter dengan teks yang diinputkan', async () => {
    const initialValue = 'initial value';
    const typedValue = 'ketikkan tulisannya';
    const handleSave = jest.fn();
    render(<TextFieldInput initialValue={initialValue} onSave={handleSave} />);

    const $input = screen.getByDisplayValue(initialValue);
    await userEvent.clear($input);
    await userEvent.type($input, `${typedValue}{Enter}`);

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith(typedValue);
  });
});
