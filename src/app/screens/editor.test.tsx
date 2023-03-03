import { render, screen } from '@testing-library/react';

import ScreenEditor from './editor';

// `pdfjs` dari `react-pdf` & `@react-pdf/renderer` perlu di-mock:
// https://github.com/wojtekmaj/react-pdf/issues/564
jest.mock('react-pdf', () => ({
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: 'https://fake.url',
    },
  },
}));

// Ini yang di-mock yang dipanggil di komponen di bawah ini aja sih
jest.mock('@react-pdf/renderer', () => ({
  StyleSheet: {
    create: jest.fn(),
  },
  Font: {
    register: jest.fn(),
  },
}));

test('ScreenEditor', () => {
  render(<ScreenEditor />);

  // Sebagian dari konten di linenya editor
  expect(screen.getByText(/informasi/i)).toBeInTheDocument();
  expect(screen.getByText(/umum:/i)).toBeInTheDocument();
  expect(screen.getByText(/tentang:/i)).toBeInTheDocument();
  expect(screen.getByText(/kontak:/i)).toBeInTheDocument();
  expect(screen.getByText(/profil online:/i)).toBeInTheDocument();

  // Konten di card pengaturan generate & preview
  expect(
    screen.getByRole('heading', { name: /generate/i })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /lihat preview/i })
  ).toBeInTheDocument();
});
