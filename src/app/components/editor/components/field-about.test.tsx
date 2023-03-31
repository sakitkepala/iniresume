import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldAbout } from './field-about';

describe('FieldAbout', () => {
  test('render label bila tanpa value', () => {
    renderLineContent({
      id: 'about',
      activateable: true,
      content: <FieldAbout />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(
      `"1// Deskripsikan singkat tentang diri atau sasaran karir kamu"`
    );
  });

  test('render teks konten dari value', () => {
    const descriptionValue = 'A long long description text';

    renderLineContent({
      id: 'date-of-birth',
      activateable: true,
      content: <FieldAbout value={descriptionValue} />,
    });

    expect(screen.getByText(descriptionValue)).toBeInTheDocument();
  });

  test('bisa pindah line dengan keyboard panah bila value masih belum diubah-ubah', async () => {
    renderLineContent({
      id: 'date-of-birth',
      activateable: true,
      content: <FieldAbout value="Initial value" />,
    });

    await userEvent.click(screen.getByLabelText(/field about/i));

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 1/i);

    await userEvent.keyboard('{Down}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).not.toHaveAccessibleName(/line 1/i);
  });

  test('tetap di line sekarang bila ganti value meskipun pakai keyboard', async () => {
    renderLineContent({
      id: 'date-of-birth',
      activateable: true,
      content: <FieldAbout value="Initial value" />,
    });

    await userEvent.click(screen.getByLabelText(/field about/i));

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 1/i);

    const $input = screen.getByDisplayValue('Initial value');
    await userEvent.clear($input);
    await userEvent.type($input, 'Value edited');
    await userEvent.keyboard('{Down}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 1/i);
  });
});
