/* eslint-disable no-irregular-whitespace */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import {
  FieldListItemAddProfile,
  ProfileLinkEditorWithCustomAccount,
} from './field-list-item-add-profile';

describe('FieldListItemAddProfile', () => {
  test('input profil baru', async () => {
    const value = {
      id: 'fake-uuid',
      text: '@jahenipis',
      url: 'instagram.com/jahenipis',
      account: 'Instagram',
    };

    renderLineContent({
      id: 'add-profile',
      activateable: true,
      content: <FieldListItemAddProfile />,
    });

    expect(screen.getByRole('listitem', { name: /line 1/i }))
      .toMatchInlineSnapshot(`
      <div
        aria-label="Line 1"
        class=""
        role="listitem"
      >
        <div>
          1
        </div>
        <div>
          <span>
            <span>
               
            </span>
            <span>
               
            </span>
            <button
              tabindex="-1"
            >
              Tambah lagi profil lain
            </button>
          </span>
        </div>
      </div>
    `);

    await userEvent.click(screen.getByText(/Tambah/i));
    await userEvent.type(
      screen.getByPlaceholderText(/platform/i),
      `${value.account}{Enter}`
    );
    await userEvent.type(
      screen.getByPlaceholderText(/Teks link/i),
      `${value.text}{Enter}`
    );
    await userEvent.type(
      screen.getByPlaceholderText(/url/i),
      `${value.url}{Enter}`
    );

    expect(screen.getByPlaceholderText(/platform/i)).not.toHaveValue();
    expect(screen.getByPlaceholderText(/Teks link/i)).not.toHaveValue();
    expect(screen.getByPlaceholderText(/url/i)).not.toHaveValue();
  });
});

describe('ProfileLinkEditorWithCustomAccount', () => {
  test('sukses input/edit profil custom', async () => {
    const value = {
      id: 'fake-uuid',
      text: '@jahenipis',
      url: 'instagram.com/jahenipis',
      account: 'Instagram',
    };
    const handleSave = jest.fn();

    render(
      <ProfileLinkEditorWithCustomAccount
        initialValue={{ id: value.id, text: '', url: '', account: '' }}
        onSave={handleSave}
      />
    );

    expect(screen.getByPlaceholderText(/platform/i)).toHaveFocus();

    await userEvent.type(
      screen.getByPlaceholderText(/platform/i),
      `${value.account}{Enter}`
    );

    expect(screen.getByPlaceholderText(/Teks link/i)).toHaveFocus();

    await userEvent.type(
      screen.getByPlaceholderText(/Teks link/i),
      `${value.text}{Enter}`
    );

    expect(screen.getByPlaceholderText(/url/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/url/i)).toHaveValue('https://');

    await userEvent.type(
      screen.getByPlaceholderText(/url/i),
      `${value.url}{Enter}`
    );

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith({
      id: value.id,
      text: value.text,
      url: 'https://' + value.url,
      account: value.account,
    });
  });

  test('pindah inputan berurutan dengan keyboard Tab', async () => {
    const handleSave = jest.fn();
    render(<ProfileLinkEditorWithCustomAccount onSave={handleSave} />);

    expect(screen.getByPlaceholderText(/platform/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/Teks link/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/url/i)).not.toHaveFocus();

    await userEvent.keyboard('{Tab}');

    expect(screen.getByPlaceholderText(/platform/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/Teks link/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/url/i)).not.toHaveFocus();

    await userEvent.keyboard('{Tab}');

    expect(screen.getByPlaceholderText(/platform/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/Teks link/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/url/i)).toHaveFocus();

    await userEvent.keyboard('{Tab}');

    expect(screen.getByPlaceholderText(/platform/i)).toHaveFocus();
    expect(screen.getByPlaceholderText(/Teks link/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/url/i)).not.toHaveFocus();

    await userEvent.keyboard('{Shift>}{Tab}');

    expect(screen.getByPlaceholderText(/platform/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/Teks link/i)).not.toHaveFocus();
    expect(screen.getByPlaceholderText(/url/i)).toHaveFocus();
  });

  test('argumen handler save untuk URL jadi string kosong kalau diisi tidak lengkap', async () => {
    let urlArg = '';
    const handleSave = jest
      .fn()
      .mockImplementation((data) => (urlArg = data.url));

    render(<ProfileLinkEditorWithCustomAccount onSave={handleSave} />);

    await userEvent.type(screen.getByPlaceholderText(/url/i), '{Enter}{Enter}');

    expect(urlArg).toBe('');

    await userEvent.clear(screen.getByPlaceholderText(/url/i));
    await userEvent.type(
      screen.getByPlaceholderText(/url/i),
      'http://{Enter}{Enter}'
    );

    expect(urlArg).toBe('');

    await userEvent.clear(screen.getByPlaceholderText(/platform/i));
    await userEvent.type(
      screen.getByPlaceholderText(/platform/i),
      'github{Enter}'
    );
    await userEvent.clear(screen.getByPlaceholderText(/url/i));
    await userEvent.type(
      screen.getByPlaceholderText(/url/i),
      'https://github.com/{Enter}{Enter}'
    );

    expect(urlArg).toBe('');

    await userEvent.clear(screen.getByPlaceholderText(/platform/i));
    await userEvent.type(
      screen.getByPlaceholderText(/platform/i),
      'linkedin{Enter}'
    );
    await userEvent.clear(screen.getByPlaceholderText(/url/i));
    await userEvent.type(
      screen.getByPlaceholderText(/url/i),
      'https://linkedin.com/in/{Enter}{Enter}'
    );

    expect(urlArg).toBe('');

    await userEvent.clear(screen.getByPlaceholderText(/platform/i));
    await userEvent.type(
      screen.getByPlaceholderText(/platform/i),
      'gitlab{Enter}'
    );
    await userEvent.clear(screen.getByPlaceholderText(/url/i));
    await userEvent.type(
      screen.getByPlaceholderText(/url/i),
      'https://gitlab.com/{Enter}{Enter}'
    );

    expect(urlArg).toBe('');

    await userEvent.clear(screen.getByPlaceholderText(/platform/i));
    await userEvent.type(
      screen.getByPlaceholderText(/platform/i),
      'twitter{Enter}'
    );
    await userEvent.clear(screen.getByPlaceholderText(/url/i));
    await userEvent.type(
      screen.getByPlaceholderText(/url/i),
      'https://twitter.com/{Enter}{Enter}'
    );

    expect(urlArg).toBe('');

    await userEvent.clear(screen.getByPlaceholderText(/platform/i));
    await userEvent.type(
      screen.getByPlaceholderText(/platform/i),
      'instagram{Enter}'
    );
    await userEvent.clear(screen.getByPlaceholderText(/url/i));
    await userEvent.type(
      screen.getByPlaceholderText(/url/i),
      'https://instagram.com/{Enter}{Enter}'
    );

    expect(urlArg).toBe('');
  });
});
