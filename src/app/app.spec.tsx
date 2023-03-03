import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './app';

jest.mock('react-pdf', () => ({
  pdfjs: {
    GlobalWorkerOptions: {
      workerSrc: 'https://fake.url',
    },
  },
}));

jest.mock('@react-pdf/renderer', () => ({
  StyleSheet: {
    create: jest.fn(),
  },
  Font: {
    register: jest.fn(),
  },
}));

describe('App', () => {
  it('Render default screen Welcome & navigasi ke screen Editor', async () => {
    render(<App />);

    expect(screen.getByText(/welcome/i)).toBeInTheDocument();
    expect(screen.getByText(/buat/i)).toBeInTheDocument();

    await userEvent.click(screen.getByText(/buat/i));
    await waitFor(() => {
      expect(screen.queryByText(/informasi/i)).toBeInTheDocument();
    });

    expect(
      screen.queryByRole('heading', { name: /generate/i })
    ).toBeInTheDocument();
  });
});
