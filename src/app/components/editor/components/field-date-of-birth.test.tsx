/* eslint-disable no-irregular-whitespace */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderLineContent } from '../test-utils';

import { FieldDateOfBirth, DateInput } from './field-date-of-birth';

describe('FieldDateOfBirth', () => {
  test('render label teks sebagai konten ketika value kosong', () => {
    renderLineContent({
      id: 'date-of-birth',
      activateable: true,
      content: <FieldDateOfBirth />,
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
          <div
            class=""
          >
            <div>
              -
            </div>
            <div>
               
            </div>
            <div>
              <span>
                // Tanggal lahir (dipakai hitung usia)
              </span>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  test('render teks konten dari value teks tanggal lahir', () => {
    const dateOfBirthValue = '1991-08-27';

    renderLineContent({
      id: 'date-of-birth',
      activateable: true,
      content: <FieldDateOfBirth value={dateOfBirthValue} />,
    });

    expect(screen.getByText(dateOfBirthValue)).toBeInTheDocument();
  });
});

describe('DateInput', () => {
  test('pindah-pindah fokus input-input teks berurutan dengan tombol Tab', async () => {
    const handleSave = jest.fn();
    render(<DateInput onSave={handleSave} />);

    expect(screen.getByLabelText(/tahun/i)).toHaveFocus();
    expect(screen.getByLabelText(/bulan/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/tanggal/i)).not.toHaveFocus();

    await userEvent.keyboard('{Tab}');

    expect(screen.getByLabelText(/tahun/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/bulan/i)).toHaveFocus();
    expect(screen.getByLabelText(/tanggal/i)).not.toHaveFocus();

    await userEvent.keyboard('{Tab}');

    expect(screen.getByLabelText(/tahun/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/bulan/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/tanggal/i)).toHaveFocus();

    await userEvent.keyboard('{Tab}');

    // Balik ke inputan pertama/"tahun"
    expect(screen.getByLabelText(/tahun/i)).toHaveFocus();
    expect(screen.getByLabelText(/bulan/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/tanggal/i)).not.toHaveFocus();

    // arah kebalikan
    await userEvent.keyboard('{Shift>}{Tab}');

    expect(screen.getByLabelText(/tahun/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/bulan/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/tanggal/i)).toHaveFocus();
  });

  test('otomatis pindah ke inputan berikutnya sesuai digit angka maksimal', async () => {
    const handleSave = jest.fn();
    render(<DateInput onSave={handleSave} />);

    expect(screen.getByLabelText(/tahun/i)).toHaveFocus();

    await userEvent.type(screen.getByLabelText(/tahun/i), '1991');

    expect(screen.getByLabelText(/tahun/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/bulan/i)).toHaveFocus();
    expect(screen.getByLabelText(/tanggal/i)).not.toHaveFocus();

    await userEvent.type(screen.getByLabelText(/bulan/i), '08');

    expect(screen.getByLabelText(/tahun/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/bulan/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/tanggal/i)).toHaveFocus();

    await userEvent.type(screen.getByLabelText(/tanggal/i), '27');

    // inputan terakhir fokus tetap di tempat
    expect(screen.getByLabelText(/tahun/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/bulan/i)).not.toHaveFocus();
    expect(screen.getByLabelText(/tanggal/i)).toHaveFocus();
  });

  test('handle save dengan teks date gabungan dari semua inputan lengkap', async () => {
    const handleSave = jest.fn();
    render(<DateInput onSave={handleSave} />);

    await userEvent.type(screen.getByLabelText(/tahun/i), '1991');
    await userEvent.type(screen.getByLabelText(/bulan/i), '08');
    await userEvent.type(screen.getByLabelText(/tanggal/i), '27{Enter}');

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith('1991-08-27');
  });

  test('handle save dengan teks kosong bila inputan gak lengkap', async () => {
    const handleSave = jest.fn();
    render(<DateInput onSave={handleSave} />);

    await userEvent.type(screen.getByLabelText(/tahun/i), '1991{Enter}');

    expect(handleSave).toHaveBeenCalledTimes(1);
    expect(handleSave).toHaveBeenCalledWith('');

    await userEvent.type(screen.getByLabelText(/bulan/i), '08{Enter}');

    expect(handleSave).toHaveBeenCalledTimes(2);
    expect(handleSave).toHaveBeenNthCalledWith(2, '');

    await userEvent.type(screen.getByLabelText(/tanggal/i), '27{Enter}');

    expect(handleSave).toHaveBeenCalledTimes(3);
    expect(handleSave).toHaveBeenNthCalledWith(3, '1991-08-27');
  });

  test('kembalikan fokus ke input sebelumnya ketika klik di area kontainer', async () => {
    const handleSave = jest.fn();
    render(<DateInput onSave={handleSave} />);
    const $container = screen.getByTestId('date-of-birth-line-container');

    expect(screen.getByLabelText(/tahun/i)).toHaveFocus();

    await userEvent.click($container);

    expect(screen.getByLabelText(/tahun/i)).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await userEvent.click($container);

    expect(screen.getByLabelText(/bulan/i)).toHaveFocus();

    await userEvent.keyboard('{Tab}');
    await userEvent.click($container);

    expect(screen.getByLabelText(/tanggal/i)).toHaveFocus();
  });
});
