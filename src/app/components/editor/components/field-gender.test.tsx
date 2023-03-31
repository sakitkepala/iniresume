/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent, renderLineContentWithData } from '../test-utils';

import { FieldGender } from './field-gender';

describe('FieldGender', () => {
  test('render label bila value kosong', () => {
    renderLineContent({
      id: 'gender',
      activateable: true,
      content: <FieldGender />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1- // Gender"`);
  });

  test('render teks konten value dari pilihan opsi', async () => {
    renderLineContentWithData((resume) => ({
      id: 'gender',
      activateable: true,
      content: <FieldGender value={resume.gender} />,
    }));

    await userEvent.click(screen.getByText(/gender/i));
    await userEvent.click(screen.getByRole('button', { name: /laki/i }));

    expect(screen.getByText(/laki/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/laki/i));
    await userEvent.click(screen.getByRole('button', { name: /perempuan/i }));

    expect(screen.getByText(/perempuan/i)).toBeInTheDocument();
  });

  test('render teks konten value dari input gender custom', async () => {
    const customValue = 'Custom Gender';

    renderLineContentWithData((resume) => ({
      id: 'gender',
      activateable: true,
      content: <FieldGender value={resume.gender} />,
    }));

    await userEvent.click(screen.getByText(/gender/i));
    await userEvent.click(screen.getByRole('button', { name: /custom/i }));
    await userEvent.type(screen.getByDisplayValue(''), `${customValue}{Enter}`);

    expect(screen.getByText(customValue)).toBeInTheDocument();
  });
});
