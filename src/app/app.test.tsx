import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './app';

describe('App', () => {
  test('render screen Welcome yang default dan navigasi ke editor', async () => {
    render(<App />);

    const $buttonCreate = screen.getByRole('button', { name: /buat resume/i });

    expect($buttonCreate).toBeInTheDocument();

    await userEvent.click($buttonCreate);

    await waitFor(() => {
      expect(screen.queryByText(/informasi/i)).toBeInTheDocument();
      expect(
        screen.queryByRole('heading', { name: /generate/i })
      ).toBeInTheDocument();
    });
  });
});
