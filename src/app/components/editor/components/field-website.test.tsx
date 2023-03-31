/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldWebsite } from './field-website';

describe('FieldWebsite', () => {
  test('defaultnya render label', () => {
    renderLineContent({
      id: 'profile-website',
      activateable: true,
      content: <FieldWebsite />,
    });

    expect(
      screen.getByRole('listitem', { name: /line 1/i }).textContent
    ).toMatchInlineSnapshot(`"1- // Website personal"`);
  });

  test('render teks link sebagai konten', () => {
    const website = {
      text: 'sakitkepala.dev',
      url: 'https://sakitkepala.dev',
    };
    renderLineContent({
      id: 'profile-website',
      activateable: true,
      content: <FieldWebsite website={website} />,
    });

    expect(screen.getByText(website.text)).toBeInTheDocument();
  });

  test('render url sebagai konten bila teks kosong', () => {
    const website = {
      text: '',
      url: 'https://sakitkepala.dev',
    };
    renderLineContent({
      id: 'profile-website',
      activateable: true,
      content: <FieldWebsite website={website} />,
    });

    expect(screen.getByText(website.url)).toBeInTheDocument();
  });

  test('simpan lalu ke line berikutnya', async () => {
    const website = {
      text: 'sakitkepala',
      url: 'https://sakitkepala.dev',
    };
    renderLineContent({
      id: 'profile-website',
      activateable: true,
      content: <FieldWebsite website={website} />,
    });

    await userEvent.click(screen.getByText(website.text));

    expect(screen.getByPlaceholderText(/teks link/i)).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    expect(screen.getByPlaceholderText(/URL/i)).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 2/i);
  });
});
