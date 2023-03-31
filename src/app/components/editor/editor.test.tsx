import { render, screen } from '@testing-library/react';

import { ResumeEditorProvider } from 'src/app/contexts/resume-editor';
import { Editor } from './editor';

describe('Editor', () => {
  test('render line-line editor berdasarkan "konten" data resume', () => {
    render(
      <ResumeEditorProvider>
        <Editor />
      </ResumeEditorProvider>
    );

    expect(screen.getByLabelText('Line 1')).toHaveTextContent(/informasi/i);

    expect(screen.getByLabelText('Line 3')).toHaveTextContent(/umum/i);

    expect(screen.getByLabelText('Line 5')).toHaveTextContent(/5/i);

    expect(screen.getByLabelText('Line 6')).toHaveTextContent(/titel profesi/i);
    expect(screen.getByLabelText('Line 7')).toHaveTextContent(/gender/i);
    expect(screen.getByLabelText('Line 8')).toHaveTextContent(/tanggal lahir/i);
    expect(screen.getByLabelText('Line 9')).toHaveTextContent(/kota/i);
    expect(screen.getByLabelText('Line 10')).toHaveTextContent(/provinsi/i);

    expect(screen.getByLabelText('Line 12')).toHaveTextContent(/tentang/i);
    expect(screen.getByLabelText('Line 14')).toHaveTextContent(/tentang diri/i);

    expect(screen.getByLabelText('Line 16')).toHaveTextContent(/kontak/i);
    expect(screen.getByLabelText('Line 18')).toHaveTextContent(/email/i);
    expect(screen.getByLabelText('Line 19')).toHaveTextContent(/telepon/i);

    expect(screen.getByLabelText('Line 21')).toHaveTextContent(/profil/i);
    expect(screen.getByLabelText('Line 23')).toHaveTextContent(/website/i);
    expect(screen.getByLabelText('Line 24')).toHaveTextContent(/github/i);
    expect(screen.getByLabelText('Line 25')).toHaveTextContent(/linkedin/i);
    expect(screen.getByLabelText('Line 26')).toHaveTextContent(/tambah/i);

    expect(screen.getByLabelText('Line 30')).toHaveTextContent(/pengalaman/i);
    expect(screen.getByLabelText('Line 32')).toHaveTextContent(/isi/i);

    expect(screen.getByLabelText('Line 36')).toHaveTextContent(/pendidikan/i);
    expect(screen.getByLabelText('Line 38')).toHaveTextContent(/isi/i);

    expect(screen.getByLabelText('Line 42')).toHaveTextContent(/skill/i);
    expect(screen.getByLabelText('Line 44')).toHaveTextContent(/isi/i);

    expect(screen.getByLabelText('Line 48')).toHaveTextContent(/projek lain/i);
    expect(screen.getByLabelText('Line 50')).toHaveTextContent(/masukkan/i);

    const $defaultActiveLine = screen.getByRole('listitem', { current: true });
    expect($defaultActiveLine).toBeInTheDocument();
    expect($defaultActiveLine).toHaveAccessibleName(/line 5/i);
  });
});
