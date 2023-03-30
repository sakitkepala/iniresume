/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContentWithData } from '../test-utils';

import { FieldListItemPhone } from './field-list-item-phone';

describe('FieldListItemPhone', () => {
  test('render nomor telepon sesuai value input', async () => {
    const phoneValue = '85777777777';

    renderLineContentWithData((resume) => ({
      id: 'phone',
      activateable: true,
      content: (
        <FieldListItemPhone
          value={resume.phone.number}
          hasWA={resume.phone.wa}
        />
      ),
    }));

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1- // Nomor telepon"`);

    await userEvent.click(screen.getByText(/telepon/i));
    await userEvent.type(screen.getByDisplayValue(''), `${phoneValue}{Enter}`);

    expect(screen.getByText('+62')).toBeInTheDocument();
    expect(screen.getByText(phoneValue)).toBeInTheDocument();
    expect(
      screen.getByRole('listitem', { current: true })
    ).not.toHaveAccessibleName(/line 1/i);
  });

  test('render info ketersediaan nomor WA', async () => {
    renderLineContentWithData((resume) => ({
      id: 'phone',
      activateable: true,
      content: (
        <FieldListItemPhone
          value={resume.phone.number}
          hasWA={resume.phone.wa}
        />
      ),
    }));

    await userEvent.click(screen.getByText(/telepon/i));
    await userEvent.type(screen.getByDisplayValue(''), '85777777777');
    await userEvent.click(screen.getByLabelText(/nomor whatsapp/i));
    await userEvent.keyboard('{Enter}');

    expect(screen.getByText(/wa available/i)).toBeInTheDocument();
  });

  test('render pesan feedback inline bila menginput dengan awalan angka 0', async () => {
    renderLineContentWithData((resume) => ({
      id: 'phone',
      activateable: true,
      content: (
        <FieldListItemPhone
          value={resume.phone.number}
          hasWA={resume.phone.wa}
        />
      ),
    }));

    await userEvent.click(screen.getByText(/telepon/i));
    await userEvent.type(screen.getByDisplayValue(''), '0');

    expect(screen.getByText(/Tanpa angka "0" di depan/i)).toBeInTheDocument();
  });
});
