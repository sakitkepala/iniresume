import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldListItemText } from './field-list-item-text';

describe('FieldListItemText', () => {
  test('render label ketika valuenya kosong', () => {
    const label = 'Nama lengkap user';

    renderLineContent({
      id: 'fullName',
      activateable: true,
      content: <FieldListItemText label={label} field="fullName" />,
    });

    expect(screen.getByLabelText(label)).toBeInTheDocument();
    // Ngecek teks labelnya persis sesuai formatnya
    expect(screen.getByLabelText(label).textContent).toBe(`// ${label}`);
  });

  test('render konten teks dari value yang disediakan', () => {
    const label = 'Nama lengkap user';
    const value = 'Ini user';

    renderLineContent({
      id: 'fullName',
      activateable: true,
      content: (
        <FieldListItemText label={label} field="fullName" value={value} />
      ),
    });

    expect(screen.getByText(value)).toBeInTheDocument();
    expect(screen.getByText(value).textContent).not.toBe(`// ${label}`);
  });

  test('render inputan kalau linenya diaktifkan', async () => {
    const label = 'Nama lengkap user';
    const value = 'Ini user';

    renderLineContent({
      id: 'fullName',
      activateable: true,
      content: (
        <FieldListItemText label={label} field="fullName" value={value} />
      ),
    });

    await userEvent.click(screen.getByText(value));
    const inputField = screen.getByDisplayValue(value);

    expect(inputField).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).not.toHaveAccessibleName('Line 1');
  });
});
