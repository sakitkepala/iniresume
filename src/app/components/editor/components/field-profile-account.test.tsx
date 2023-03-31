/* eslint-disable no-irregular-whitespace */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldProfileAccount } from './field-profile-account';

describe('FieldProfileAccount', () => {
  test('render teks konten sesuai value akunnya', () => {
    const value = {
      id: 'github',
      account: 'github',
      text: 'sakitkepala',
      url: 'https://github.com/sakitkepala',
    };
    renderLineContent({
      id: 'profile-item',
      activateable: true,
      content: <FieldProfileAccount account={value} />,
    });

    expect(screen.getByText(/github:/i)).toBeInTheDocument();
    expect(screen.getByText(value.text)).toBeInTheDocument();
  });

  test('render url sebagai konten bila teks dikosongi', () => {
    const value = {
      id: 'github',
      account: 'github',
      text: '',
      url: 'https://github.com/sakitkepala',
    };
    renderLineContent({
      id: 'profile-item',
      activateable: true,
      content: <FieldProfileAccount account={value} />,
    });

    expect(screen.getByText(value.url)).toBeInTheDocument();
  });

  test('render editor link profil Github tanpa akun custom', async () => {
    renderLineContent({
      id: 'github-profile-item',
      activateable: true,
      content: (
        <FieldProfileAccount
          account={{
            id: 'github',
            account: 'github',
            text: 'sakitkepala',
            url: 'https://github.com/sakitkepala',
          }}
        />
      ),
    });

    await userEvent.click(screen.getByText(/github:/i));

    expect(screen.queryByPlaceholderText(/platform/i)).not.toBeInTheDocument();
  });

  test('render editor link profil LinkedIn tanpa akun custom', async () => {
    renderLineContent({
      id: 'linkedin-profile-item',
      activateable: true,
      content: (
        <FieldProfileAccount
          account={{
            id: 'linkedin',
            account: 'linkedin',
            text: 'sakitkepala',
            url: 'https://linkedin.com/in/myprofile',
          }}
        />
      ),
    });

    await userEvent.click(screen.getByText(/linkedin:/i));

    expect(screen.queryByPlaceholderText(/platform/i)).not.toBeInTheDocument();
  });

  test('simpan data input lalu ke line selanjutnya', async () => {
    renderLineContent({
      id: 'github-profile-item',
      activateable: true,
      content: (
        <FieldProfileAccount
          account={{
            id: 'github',
            account: 'github',
            text: 'sakitkepala',
            url: 'https://github.com/sakitkepala',
          }}
        />
      ),
    });

    await userEvent.click(screen.getByText(/github:/i));

    expect(screen.getByPlaceholderText(/teks link/i)).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    expect(screen.getByPlaceholderText(/url/i)).toHaveFocus();

    await userEvent.keyboard('{Enter}');

    expect(
      screen.getByRole('listitem', { current: true })
    ).toHaveAccessibleName(/line 2/i);
  });
});
